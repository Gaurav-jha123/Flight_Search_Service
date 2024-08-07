const { CityService } = require("../services/index");
const logger = require('../utils/logger');
const { SuccessCodes, ServerErrorCodes, ClientErrorCodes } = require('../utils/error-codes');
const client = require('../utils/redis-client')

const cityService = new CityService();

/**
 * Controller to create a new city
 */
const create = async (req, res) => {
    try {
        const city = await cityService.createCity(req.body);
        return res.status(SuccessCodes.CREATED).json({
            data: city,
            success: true,
            message: 'Successfully created a city',
            err: {}
        });
    } catch (error) {
        logger.error('Error creating city:', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Unable to create a city',
            err: error.message
        });
    }
};

/**
 * Controller to delete a city by ID
 */
const destroy = async (req, res) => {
    try {
        const response = await cityService.deleteCity(req.params.id);
        if (!response.success) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                data: {},
                success: false,
                message: response.message,
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: response.message,
            err: {}
        });
    } catch (error) {
        logger.error('Error deleting city:', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Unable to delete the city',
            err: error.message
        });
    }
};


/**
 * Controller to get a city by ID
 */
const get = async (req, res) => {
    const cityId = req.params.id;
    try {
        const cachedCity = await client.get(`city:${cityId}`);
        if (cachedCity) {
            return res.status(SuccessCodes.OK).json({
                data: JSON.parse(cachedCity),
                success: true,
                message: 'Successfully fetched the city from cache',
                err: {}
            });
        }

        // Fetch from database if not cached
        const response = await cityService.getCity(cityId);
        await client.set(`city:${cityId}`, JSON.stringify(response), { EX: 3600 }); // Cache for 1 hour
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: 'Successfully fetched the city',
            err: {}
        });
    } catch (error) {
        logger.error('Error fetching city:', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Unable to get the city',
            err: error.message
        });
    }
};

/**
 * Controller to update a city by ID
 */
const update = async (req, res) => {
    try {
        const response = await cityService.updateCity(req.params.id, req.body);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: 'Successfully updated the city',
            err: {}
        });
    } catch (error) {
        logger.error('Error updating city:', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Unable to update the city',
            err: error.message
        });
    }
};

/**
 * Controller to get all cities based on filters
 */
const getAll = async (req, res) => {
    try {
        const cachedCities = await client.get('allCities');
        if (cachedCities) {
            return res.status(SuccessCodes.OK).json({
                data: JSON.parse(cachedCities),
                success: true,
                message: 'Successfully fetched all the flight data from cache'
            });
        }

        const response = await cityService.getAllCities(req.query);
        await client.set('allCities', JSON.stringify(response), { EX: 30 });  // Cache the response
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: 'Successfully fetched all the flight data'
        });
    } catch (error) {
        logger.error('Error fetching cities:', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Not able to fetch all the flight data',
            err: error.message
        });
    }
};

module.exports = {
    create,
    destroy,
    get,
    update,
    getAll
};
