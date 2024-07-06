const { Op } = require('sequelize');

const { City } = require('../models/index');


class CityRepository{
    async createCity ({ name }){
        try {
            const city = await City.create ({ name});
            return city;
        }catch (error){
            console.log("Something went wrong at repo layee willl handle better suing cutom eros and loggers");
            throw {error};
        }
    }

    async deleteCity(cityId){
        try{
            const city = await City.findOne({ where: { id: cityId } });
            if (!city) {
                return { success: false, message: 'City not found' };
            }
            await City.destroy({ where: { id: cityId } });
            return { success: true, message: 'City deleted successfully' };
            return true;
            }catch(error){
            throw {error};
        }

    }

    async getCity(cityId){
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw {error};
        }
    }
    
    async getAllCities(filter){
        try {
            if(filter.name){
                const cities  =  await City.findAll({
                    where : {
                        name : {
                            [Op.startsWith] : filter.name
                        }
                    }
                });
                return cities;
            }
            const cities =  await City.findAll();
            return cities;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw {error};  
        }
    }

    async updateCity(cityId, data){
        try{
            // this also work but won't give udpated object
            // const city = await City.update(data, {
            //     where : {
            //         id : cityId,
            //     }
            // });
            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save();
            return city;
        }catch(error){
            console.log("Something went wrong in repo layer");
            throw {error};
        }

    }
}

module.exports = CityRepository;