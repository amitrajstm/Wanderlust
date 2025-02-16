const joi =require("joi");
module.exports.listingSchema = joi.object({
    listing :joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price :joi.number().required().min(0),
        image :joi.string().allow("",null),
    }).required(),
});

module.exports.reviweSchema = joi.object({
    review:joi.object({
        reaitg:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required(),
})

// const Joi = require("joi");

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string()
//             .required()
//             .messages({
//                 "string.empty": "Title is required and cannot be empty.",
//                 "any.required": "Title is a mandatory field.",
//             }),
//         description: Joi.string()
//             .required()
//             .messages({
//                 "string.empty": "Description is required and cannot be empty.",
//                 "any.required": "Description is a mandatory field.",
//             }),
//         location: Joi.string()
//             .required()
//             .messages({
//                 "string.empty": "Location is required and cannot be empty.",
//                 "any.required": "Location is a mandatory field.",
//             }),
//         country: Joi.string()
//             .required()
//             .messages({
//                 "string.empty": "Country is required and cannot be empty.",
//                 "any.required": "Country is a mandatory field.",
//             }),
//         price: Joi.number()
//             .required()
//             .min(0)
//             .messages({
//                 "number.base": "Price must be a number.",
//                 "number.min": "Price cannot be less than 0.",
//                 "any.required": "Price is a mandatory field.",
//             }),
//         image: Joi.string()
//             .allow("", null)
//             .messages({
//                 "string.base": "Image URL must be a string.",
//             }),
//     }).required(),
// });
