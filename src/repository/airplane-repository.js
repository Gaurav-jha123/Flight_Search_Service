const { Airplane } = require('../models/index');

class AirplaneRepository {
    async getAirplane(id) {
        try {
            const ariplane = await Airplane.findByPk(id);
            return ariplane;
        } catch (error) {
            console.log("Something went wrong at repository layer while fetching a flight");
            throw { error };
        }
    }
}

module.exports = AirplaneRepository;