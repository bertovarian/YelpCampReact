const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review')

const ImageSchema = new Schema({
    url: String,
    filename: String
}, {
    toJSON: { virtuals: true } // Virtuals are included in subdocuments
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_300');
});

ImageSchema.virtual('show').get(function () {
    return this.url.replace('/upload', '/upload/w_840,h_600,c_fill,g_auto');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: [ImageSchema],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            //required: true
        },
        coordinates: {
            type: [Number],
            //required: true
        }
    }
}, opts)

//ONCE YOU DELETE A CAMPGROUND YOU AUTOMATICALLY ERASE ALL THE REVIEWS RELATED TO IT
CampgroundSchema.post('findOneAndDelete', async function (data) {
    if (data) {
        await Review.deleteMany({ _id: { $in: data.review } })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);