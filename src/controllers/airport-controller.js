const { AirportService } = require('../services/index');

const airportService = new AirportService();

const create = async (req, res) => {
    try {
        const response = await airportService.create(req.body);
        return res.status(201).json({
            message: 'Successfully created the airport',
            err : {},
            data: response,
            sucesss : true
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            sucesss: false,
            err : error,
            message: 'Cannot create a new aiport'
        })
    }
}

module.exports = {
    create
}