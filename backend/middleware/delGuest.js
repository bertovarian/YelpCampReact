// const Campground = require("../models/campground")
// const Review = require("../models/review")
// const User = require("../models/user")
// const delGuest = async (guestID) => {
//     try {
//         // Step 1: Find reviews authored by the guest
//         const reviews = await Review.find({ author: guestID });

//         // Step 2: Extract review IDs
//         const reviewIds = reviews.map(review => review._id);

//         // Step 3: Delete the reviews
//         await Review.deleteMany({ _id: { $in: reviewIds } });

//         // Step 4: Remove references to deleted reviews from campgrounds
//         await Campground.updateMany(
//             { review: { $in: reviewIds } },
//             { $pull: { review: { $in: reviewIds } } }
//         );

//         // Step 5: Find campgrounds authored by the guest
//         const campgrounds = await Campground.find({ author: guestID });

//         // Step 6: Delete reviews linked to these campgrounds
//         const reviewsToDelete = [];
//         for (let i = 0; i < campgrounds.length; i++) {
//             reviewsToDelete.push(...campgrounds[i].review);
//         }
//         await Review.deleteMany({ _id: { $in: reviewsToDelete } });

//         // Step 7: Delete the campgrounds authored by the guest
//         await Campground.deleteMany({ author: guestID });

//         // Step 8: Delete the guest user
//         await User.findByIdAndDelete(guestID);

//     } catch (e) {
//         throw (e)
//     }
// }

// module.exports = delGuest


const Campground = require("../models/campground");
const Review = require("../models/review");
const User = require("../models/user");
const { cloudinary } = require("../cloudinary");

const delGuest = async (guestID) => {
    try {
        // Step 1: Find reviews authored by the guest
        const reviews = await Review.find({ author: guestID });

        // Step 2: Extract review IDs
        const reviewIds = reviews.map(review => review._id);

        // Step 3: Delete the reviews
        await Review.deleteMany({ _id: { $in: reviewIds } });

        // Step 4: Remove references to deleted reviews from campgrounds
        await Campground.updateMany(
            { review: { $in: reviewIds } },
            { $pull: { review: { $in: reviewIds } } }
        );

        // Step 5: Find campgrounds authored by the guest
        const campgrounds = await Campground.find({ author: guestID });

        // Step 6: Delete reviews linked to these campgrounds
        const reviewsToDelete = [];
        for (let i = 0; i < campgrounds.length; i++) {
            reviewsToDelete.push(...campgrounds[i].review);
        }
        await Review.deleteMany({ _id: { $in: reviewsToDelete } });

        // Step 7: Delete images from Cloudinary
        for (let i = 0; i < campgrounds.length; i++) {
            const images = campgrounds[i].image; // Assuming `image` is an array of objects with `filename`
            for (let j = 0; j < images.length; j++) {
                const filename = images[j].filename; // Extract the Cloudinary filename
                await cloudinary.uploader.destroy(filename); // Delete the image from Cloudinary
            }
        }

        // Step 8: Delete the campgrounds authored by the guest
        await Campground.deleteMany({ author: guestID });

        // Step 9: Delete the guest user
        await User.findByIdAndDelete(guestID);

    } catch (e) {
        throw e;
    }
};

module.exports = delGuest;