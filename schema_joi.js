const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    //keno holo buzlam na
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});



// module.exports = listingSchema;