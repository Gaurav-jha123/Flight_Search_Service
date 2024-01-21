const { City } = require('../models/index');


class CityRepository{
    async createCity ({ name }){
        try {
            const city = await City.create ({ name});
            return city;
        }catch (error){
            throw {error};
            console.log("Something went wrong at repo layee willl handle better suing cutom eros and loggers");
        }
    }

    async deleteCity(cityId){
        try{
            await City.destroy({
                where : {
                    id : cityId
                }
            });
            return true;
            }catch(error){
            throw {error};
        }

    }

    async getCity(cityId , {name}){
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw {error};
        }
    }

    async updateCity(cityId, data){
        try{
            const city = await City.update(data, {
                where : {
                    id : cityId
                }
            });
            return city;
        }catch(error){
            console.log("Something went wrong in repo layer");
            throw {error};
        }

    }
}

module.exports = CityRepository;