const { FlightRepository, AirplaneRepository } = require('../repository/index');
const { compareTime } = require('../utils/helper');
const logger = require('../utils/logger');
const { StatusCodes } = require('http-status-codes');

const createServiceError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data) {
        try {
            if (!compareTime(data.arrivalTime, data.departureTime)) {
                throw new Error('Arrival time must be after departure time');
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({
                ...data,
                totalSeats: airplane.capacity
            });
            return flight;
        } catch (error) {
            logger.error('Error in FlightService.createFlight:', error);
            throw new Error('Could not create flight');
        }
    }

    async getAllFlightData(data) {
        try {
            console.log(`flight service layer is hit`);
            
            return await this.flightRepository.getAllFlights(data);
        } catch (error) {
            logger.error('Error in FlightService.getAllFlightData:', error);
            throw new Error('Could not get flights');
        }
    }

    async getFlight(flightId) {
        try {
            return await this.flightRepository.getFlight(flightId);
        } catch (error) {
            logger.error('Error in FlightService.getFlight:', error);
            throw new Error('Could not get flight');
        }
    }

    async updateFlight(flightId, data) {
        try {
            if (data.seatDelta !== undefined) {
                const seatDelta = Number(data.seatDelta);

                if (!Number.isInteger(seatDelta) || seatDelta === 0) {
                    throw createServiceError('seatDelta must be a non-zero integer', StatusCodes.BAD_REQUEST);
                }

                const updatedFlight = await this.flightRepository.adjustSeats(flightId, seatDelta);
                if (updatedFlight === null) {
                    throw createServiceError('Flight not found', StatusCodes.NOT_FOUND);
                }

                if (updatedFlight === false) {
                    throw createServiceError('Insufficient seats available', StatusCodes.CONFLICT);
                }

                return updatedFlight;
            }

            if (data.totalSeats !== undefined) {
                const totalSeats = Number(data.totalSeats);
                if (!Number.isInteger(totalSeats) || totalSeats < 0) {
                    throw createServiceError('totalSeats must be a non-negative integer', StatusCodes.BAD_REQUEST);
                }
            }

            return await this.flightRepository.updateFlight(flightId, data);
        } catch (error) {
            logger.error('Error in FlightService.updateFlight:', error);
            if (error.statusCode) {
                throw error;
            }

            throw new Error('Could not update flight');
        }
    }
}

module.exports = FlightService;
