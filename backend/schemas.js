const Joi = require('joi');

const campgroundSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    description: Joi.string().required(),
    deletedImages: Joi.string().allow(''),
    newImagesCount: Joi.number()
});

const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().integer().required().min(1).max(5)
    }).required()
});

const userSchema = Joi.object({
    user: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$/)
    }).required(),
});

module.exports = { campgroundSchema, reviewSchema, userSchema }