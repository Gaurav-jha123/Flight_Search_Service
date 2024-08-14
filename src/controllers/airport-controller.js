const { AirportService } = require('../services/index');
const logger = require('../utils/logger');
const { SuccessCodes, ServerErrorCodes, ClientErrorCodes } = require('../utils/error-codes');

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

const getAirportsById = async (req, res) => {
    try {
        const airportId = req.params.airportId;
        const response = await airportService.get(airportId);
        if(!response){
            logger.error(`error in airport Contoller`, error);
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                data: {},
                success: false,
                err: error.message,
                message: `Cannot fetch airport with id ${airportId}`
            });
        }
        return res.status(SuccessCodes.OK).json({
            message: `Successfully fetched the airports with id ${airportId}`,
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
            message: 'Cannot fetch the airport'
        });
    }
};

module.exports = {
    create,
    getAirportsById
};
