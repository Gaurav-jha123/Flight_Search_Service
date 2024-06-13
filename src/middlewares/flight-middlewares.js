const { ClientErrorCodes } = require('../utils/error-codes');

const flightSchema = require('../validations/flightSchema');

const validateCreateFlight = (req, res, next) => {
  const { error } = flightSchema.validate(req.body);
  if (error) {
    return res.status(ClientErrorCodes.BAD_REQUEST).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateCreateFlight
};
