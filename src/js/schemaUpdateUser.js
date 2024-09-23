import Joi from 'joi';

const messangerJoi = Joi.string().min(2).max(256).required();

const validationSchema = Joi.object({
                name: Joi.object({
                            first: messangerJoi.label("First name"),
                            middle: Joi.string().min(2).max(256).allow(""),
                            last: messangerJoi.label("Last name"),
                }),
                phone: Joi.string().pattern(/^(?:\+972|0)(?:2[1-9]|[3-9][0-9])[\d]{7}$/, 'phone').message('"Phone" must be a standard Israeli phone number').required(),
                image: Joi.object({
                            url: Joi.string().regex(/\.(jpg|jpeg|png|gif|bmp|webp)$/).message('"image URL" must be a standard URL').allow(""),
                            alt: Joi.string().min(2).max(256).allow(""),
                }),
                address: Joi.object({
                            state: Joi.string().min(2).max(256).allow(""),
                            country: messangerJoi.label("Country"),
                            city: messangerJoi.label("City"),
                            street: messangerJoi.label("Street"),
                            houseNumber: Joi.number().positive().required().messages({
            'number.base': 'House number must be a number',
            'number.positive': 'House number must be a positive number',
            'any.required': 'House number is required'
        }).label("House number"),
        zip: Joi.number().positive().required().messages({
            'number.base': 'Zip number must be a number',
            'number.positive': 'Zip number must be a positive number',
            'any.required': 'Zip is required'
        })
        .label("Zip"),
                }),
                isBusiness: Joi.boolean(),
    });      

export default validationSchema;