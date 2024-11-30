const { FlightRepository, AirplaneRepository } = require('../repository/index');
const { compareTime } = require('../utils/helper');
const logger = require('../utils/logger');

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
            return await this.flightRepository.updateFlight(flightId, data);
        } catch (error) {
            logger.error('Error in FlightService.updateFlight:', error);
            throw new Error('Could not update flight');
        }
    }
}

module.exports = FlightService;
