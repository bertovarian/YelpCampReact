require('dotenv').config();

const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const cities = require('./cities');
const Campground = require('../models/campground');
const User = require('../models/user');
const Review = require('../models/review')
const { descriptors, places } = require('./seedHelpers');
const func_pexels = require('./pexel');
const func_pixabay = require('./pixabay');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URL);
// mongoose.connect('mongodb://localhost:27017/yelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Helper function to sample an array
const sample = array => array[Math.floor(Math.random() * array.length)];

// Function to upload an image to Cloudinary
const uploadToCloudinary = async (imageUrl) => {
    try {
        const result = await cloudinary.uploader.upload(imageUrl, {
            folder: "YelpCampReact"
        });
        return {
            url: result.secure_url,
            filename: result.public_id
        };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};

// Function to delete all images in the Cloudinary folder
const deleteAllCloudinaryImages = async () => {
    try {
        // Fetch all resources (images) in the YelpCamp folder
        const { resources } = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'YelpCampReact/', // Filter images under the "YelpCamp" folder
            max_results: 500 // Fetch up to 500 images (adjust if needed)
        });

        // Extract public IDs of all images
        const publicIds = resources.map(file => file.public_id);

        if (publicIds.length === 0) {
            console.log('No images found in Cloudinary YelpCamp folder.');
            return;
        }

        // Delete images in bulk
        const deleteResponse = await cloudinary.api.delete_resources(publicIds);
        console.log('Deleted Cloudinary images:', deleteResponse);
    } catch (error) {
        console.error('Error deleting Cloudinary images:', error);
    }
};

// Seeding function
const seedDB = async (loops, query, source) => {
    try {
        // **Step 1: Delete existing images in YelpCamp folder**
        console.log('Deleting existing images from Cloudinary YelpCamp folder...');
        await deleteAllCloudinaryImages();
        console.log('Existing images deleted.');

        // **Step 2: Delete existing campgrounds,reviews and users**
        console.log('Deleting existing campgrounds and users...');
        await Campground.deleteMany({});
        await User.deleteMany({});
        await Review.deleteMany({})

        console.log('Existing campgrounds, users and reviews deleted.');

        // **Step 3: Create a user automatically**
        console.log('Creating a user...');
        const username = 'seedUser'; // Predefined username
        const password = 'seedUser123.'; // Predefined password
        const email = 'seed@user.com'
        const user = new User({ username, email, hashedPW: password })
        await user.save();
        console.log(`Created user: ${username} with password: ${password}`);

        // **Step 4: Fetch images from**
        console.log('Fetching images...');
        const fetchedImages = await source(loops, query); // Getting images from Pexels
        console.log('Fetched images:', fetchedImages.length);

        if (fetchedImages.length === 0) {
            console.error('No images fetched from Pexels.');
            return;
        }

        // **Step 5: Upload images to Cloudinary**
        console.log('Uploading images to Cloudinary...');
        const cloudinaryImages = [];
        for (const imageUrl of fetchedImages) {
            const uploadedImage = await uploadToCloudinary(imageUrl);
            if (uploadedImage) {
                cloudinaryImages.push(uploadedImage);
            }
        }
        console.log('Uploaded images to Cloudinary:', cloudinaryImages.length);

        if (cloudinaryImages.length === 0) {
            console.error('No images were uploaded to Cloudinary.');
            return;
        }

        // **Step 6: Seed the database**
        console.log('Seeding the database...');
        for (let i = 0; i < loops; i++) {
            if (cloudinaryImages.length === 0) {
                console.warn('No more images available for campgrounds.');
                break; // Stop if we run out of images
            }

            // **Assign up to 2 images per campground (or fewer if less remain)**
            const imagesForCamp = cloudinaryImages.splice(0, 2); // Extract 2 images (or 1 if only 1 remains)

            // **Generate random campground details**
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;

            // **Create new campground entry**
            const camp = new Campground({
                author: user._id, // Use the automatically created user's ID
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                geometry: {
                    type: "Point",
                    coordinates: [
                        cities[random1000].longitude,
                        cities[random1000].latitude
                    ]
                },
                image: imagesForCamp, // Assign selected images
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
                price
            });

            await camp.save();
            console.log(`Created campground with ${imagesForCamp.length} images.`);
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

// Run the seeding script
seedDB(5, 'tent', func_pixabay).then(() => {
    mongoose.connection.close();
});