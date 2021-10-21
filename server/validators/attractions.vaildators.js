const { celebrate, Joi, errors, Segments } = require('celebrate');
const express = require('express');
const app = express();
app.use(errors());

exports.getAttractionsValidator = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        lon: Joi.string().required(),
        lat: Joi.string().required(),
        category: Joi.string().required(),
    })
});
