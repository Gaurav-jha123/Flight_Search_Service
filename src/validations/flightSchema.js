const Joi = require('joi');

const flightSchema = Joi.object({
  flightNumber: Joi.string().required(),
  airplaneId: Joi.number().integer().required(),
  departureAirportId: Joi.number().integer().required(),
  arrivalAirportId: Joi.number().integer().required(),
  arrivalTime: Joi.date().required(),
  departureTime: Joi.date().required(),
  price: Joi.number().integer().required(),
  boardingGate: Joi.string().optional(),
  totalSeats: Joi.number().integer().optional()
});

module.exports = flightSchema;
