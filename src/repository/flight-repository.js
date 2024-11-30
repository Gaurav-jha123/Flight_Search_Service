const { Flights , Airport , City , sequelize } = require('../models/index');
const { Op } = require('sequelize');

class FlightRepository {

    #createFilter(data) {
        let filter = {}; 
        let priceFilter = [];
        let andConditions = [];
    
        // Filter by arrival airport
        if (data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        // Filter by departure airport
        if (data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId;
        }
        // Filter by price range
        if (data.minPrice) {
            priceFilter.push({ price: { [Op.gte]: data.minPrice } });
        }
        if (data.maxPrice) {
            priceFilter.push({ price: { [Op.lte]: data.maxPrice } });
        }
        if (priceFilter.length > 0) {
            andConditions.push({ [Op.and]: priceFilter });
        }
    
        // Filter by departure location (city name)
        if (data.departureLocation) {
            andConditions.push(
                sequelize.where(
                  sequelize.fn('lower', sequelize.col('departureAirport.city.name')),
                  { [Op.like]: `%${data.departureLocation.toLowerCase()}%` }
                )
              );
        }
        // Filter by arrival location (city name)
        if (data.arrivalLocation) {
            andConditions.push(
                sequelize.where(
                  sequelize.fn('lower', sequelize.col('arrivalAirport.city.name')),
                  { [Op.like]: `%${data.arrivalLocation.toLowerCase()}%` }
                )
              );
        }
        // Filter by departure date
        if (data.departureDate) {
            andConditions.push({
                departureTime: { [Op.startsWith]: data.departureDate } // Matches date prefix
            });
        }
    
        // Combine conditions
        if (andConditions.length > 0) {
            Object.assign(filter, { [Op.and]: andConditions });
        }
    
        return filter;
    }
    

    async createFlight(data) {
        try {
            const flight = await Flights.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong at repository layer while creating a flight");
            throw { error };
        }
    }

    async getFlight(flightId){
        try {
            const flight = await Flights.findByPk(flightId , {
                include: [
                    {
                        model : Airport,
                        as : 'departureAirport',
                        include : [
                            {
                                model : City,
                                as: 'city'
                            }
                        ]
                    },
                    {
                        model : Airport,
                        as: 'arrivalAirport',
                        include : [
                            {
                                model : City,
                                as: 'city'
                            }
                        ]
                    }
                ]
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong at repository layer while fetching");
            throw { error };
        }
    }

    async getAllFlights(filter){
        try {
            console.log(`before hitting the filter object ${filter.query}`);            
            const filterObject = this.#createFilter(filter.query);
            console.log(filterObject);            
            const page = filter.query.page || 1; // Default to page 1 if not provided
            const limit = filter.query.limit || 10; // Default to 5 items per page if not provided
            
            const offset = (page - 1) * limit;
            
            const flights = await Flights.findAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
                where : filterObject,
                attributes : ['id' , 'flightNumber' ,'departureTime' , 'arrivalTime' , 'price'],
                include : [
                    {
                    model : Airport,
                    as : 'departureAirport',
                    attributes : ['id' , 'name'],
                    include : [
                        {
                            model : City,
                            as : 'city',
                            attributes : ['id' , 'name'],
                        }
                    ]
                    },
                    {
                        model : Airport,
                        as : 'arrivalAirport',
                        attributes : ['id' , 'name'] ,
                        include : [
                            {
                                model : City,
                                as: 'city',
                                attributes : ['id' , 'name'],
                            }
                        ]
                    }
                ]
            },
        );
            return flights;
        } catch (error) {
            console.log("Something went wrong at repository layer while fetching");
            throw { error };
        }
    }

    async updateFlight(flightId,data)
        {
            try {
                await Flights.update(data,{
                    where:{
                        id:flightId
                    }
                });
                return true; 
            } catch (error) {
                console.log("Something went wrong in repository layer");
                throw{error};
            }
        }
}

        

module.exports = FlightRepository;