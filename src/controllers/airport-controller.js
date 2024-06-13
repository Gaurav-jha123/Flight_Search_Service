const { AirportService } = require('../services/index');
const logger = require('../utils/logger');
const { SuccessCodes, ServerErrorCodes } = require('../utils/error-codes');

const airportService = new AirportService();

const create = async (req, res) => {
    try {
        const response = await airportService.create(req.body);
        return res.status(SuccessCodes.CREATED).json({
            message: 'Successfully created the airport',
            err: {},
            data: response,
            success: true
        });
    } catch (error) {
        logger.error('Error in create airport controller:', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            err: error.message,
            message: 'Cannot create a new airport'
        });
    }
};

module.exports = {
    create
};
