const { FlightService } = require('../services/index');
const logger = require('../utils/logger');
const { SuccessCodes, ServerErrorCodes } = require('../utils/error-codes');
const client = require('../utils/redis-client');

const flightService = new FlightService();

const create = async (req, res) => {
    try {
        const flightRequestData = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price
        };
        const flight = await flightService.createFlight(flightRequestData);
        return res.status(SuccessCodes.CREATED).json({
            data: flight,
            success: true,
            message: 'Successfully created a flight',
            err: {}
        });
    } catch (error) {
        logger.error(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Not able to create a flight',
            err: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const cachedValue = await client.get('allFlights');
        if (cachedValue) {
            return res.status(SuccessCodes.OK).json({
                data: JSON.parse(cachedValue),
                success: true,
                message: 'Successfully fetched all flight data from cache',
                err: {}
            });
        }

        console.log(`Hitting the controller layer with ${req}`);        
        const response = await flightService.getAllFlightData(req);
        await client.set('allFlights', JSON.stringify(response), { EX: 5 }); // Cache for 1 hour

        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: 'Successfully fetched all flight data',
            err: {}
        });
    } catch (error) {
        logger.error('Error fetching flights:', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Unable to fetch all flight data',
            err: error.message
        });
    }
};

const get = async (req, res) => {
    try {
        const cachedValue = await client.get(`flight_${req.params.id}`);
        if (cachedValue) {
            return res.status(SuccessCodes.OK).json({
                data: JSON.parse(cachedValue),
                success: true,
                message: 'Successfully fetched the flight from cache',
                err: {}
            });
        }

        const response = await flightService.getFlight(req.params.id);
        await client.set(`flight_${req.params.id}`, JSON.stringify(response), { EX: 10 }); // Cache for 1 hour

        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: 'Successfully fetched the flight',
            err: {}
        });
    } catch (error) {
        logger.error('Error fetching flight:', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Unable to fetch the flight',
            err: error.message
        });
    }
};


const update = async (req, res) => {
    try {
        const response = await flightService.updateFlight(req.params.id, req.body);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            err: {},
            message: 'Successfully updated the flight'
        });
    } catch (error) {
        logger.error(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Not able to update the flight',
            err: error.message
        });
    }
};

module.exports = {
    create, getAll, get, update
};
