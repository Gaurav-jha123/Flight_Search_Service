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

    async getCity(cityId){
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