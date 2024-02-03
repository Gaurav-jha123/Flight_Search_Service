const { Flights } = require('../models/index');

class FlightRepository {
    async createFlight(data) {
        try {
            const flight = await Flights.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong at repoistory layer while creating a flight");
            throw { error };
        }
    }
}

module.exports = FlightRepository;