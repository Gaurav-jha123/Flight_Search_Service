const { CityRepository } = require('../repository/index');
const logger = require('../utils/logger');

class CityService {
    constructor() {
        this.cityRepository = new CityRepository();
    }

    async createCity(data) {
        try {
            return await this.cityRepository.createCity(data);
        } catch (error) {
            logger.error('Error in CityService.createCity:', error);
            throw new Error('Could not create city');
        }
    }

    async deleteCity(cityId) {
        try {
            const result = await this.cityRepository.deleteCity(cityId);
            if (!result.success) {
                throw new Error(result.message);
            }
            return result;
        } catch (error) {
            logger.error('Error in CityService.deleteCity:', error);
            throw new Error('Could not delete city');
        }
    }

    async updateCity(cityId, data) {
        try {
            return await this.cityRepository.updateCity(cityId, data);
        } catch (error) {
            logger.error('Error in CityService.updateCity:', error);
            throw new Error('Could not update city');
        }
    }

    async getCity(cityId) {
        try {
            return await this.cityRepository.getCity(cityId);
        } catch (error) {
            logger.error('Error in CityService.getCity:', error);
            throw new Error('Could not get city');
        }
    }

    async getAllCities(filter) {
        try {
            return await this.cityRepository.getAllCities({ name: filter.name });
        } catch (error) {
            logger.error('Error in CityService.getAllCities:', error);
            throw new Error('Could not get cities');
        }
    }
}

module.exports = CityService;
