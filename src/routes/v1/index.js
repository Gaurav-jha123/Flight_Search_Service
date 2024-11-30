const express = require('express');

const { FlightMiddlewares } = require('../../middlewares/index');

const cityController = require('../../controllers/city-controller');
const flightsController  =  require('../../controllers/flight-controller');
const airportController = require('../../controllers/airport-controller');
const adminCheck = require('../../middlewares/adminCheckMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/city:
 *   get:
 *     summary: Get all cities
 *     description: Retrieve a list of all cities.
 *     responses:
 *       '200':
 *         description: A JSON array of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The city ID
 *                   name:
 *                     type: string
 *                     description: The city name
 */

router.get('/city',cityController.getAll);
/**
 * @swagger
 * /api/v1/city:
 *   post:
 *     summary: Create a new city
 *     description: Add a new city to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The city name *               
 *     responses:
 *       '201':
 *         description: City created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The city ID
 *                 name:
 *                   type: string
 *                   description: The city name
 */
router.post('/city' , adminCheck, cityController.create);  // i.e /v1/city
/**
 * @swagger
 * /api/v1/city/{id}:
 *   delete:
 *     summary: Delete a city by ID
 *     description: Delete a single city by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The city ID
 *     responses:
 *       '204':
 *         description: City deleted successfully
 *       '404':
 *         description: City not found
 *       '400':
 *         description: no city there with that id
 */

router.delete('/city/:id' ,adminCheck , cityController.destroy);  // i.e /v1/city  // same way in postman

/**
 * @swagger
 * /api/v1/city/{id}:
 *   get:
 *     summary: Get a city by ID
 *     description: Retrieve a single city by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The city ID
 *     responses:
 *       '200':
 *         description: A single city
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The city ID
 *                 name:
 *                   type: string
 *                   description: The city name
 *       '404':
 *         description: City not found
 *       '400':
 *         description: Invalid ID supplied
 */
router.get('/city/:id', cityController.get);
/**
 * @swagger
 * /api/v1/city/{id}:
 *   patch:
 *     summary: Update a city by ID
 *     description: Update a single city by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The city ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The city name
 *     responses:
 *       '200':
 *         description: City updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The city ID
 *                 name:
 *                   type: string
 *                   description: The city name
 *       '404':
 *         description: City not found
 *       '400':
 *         description: Invalid ID supplied
 */
router.patch('/city/:id', adminCheck , cityController.update);
/**
 * @swagger
 * /api/v1/flights:
 *   post:
 *     summary: Create a new flight
 *     description: Add a new flight to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightNumber:
 *                 type: string
 *                 description: The flight number
 *               airplaneId:
 *                 type: integer
 *                 description: The airplane ID
 *               departureAirportId:
 *                 type: integer
 *                 description: The departure airport ID
 *               arrivalAirportId:
 *                 type: integer
 *                 description: The arrival airport ID
 *               arrivalTime:
 *                 type: string
 *                 format: date-time
 *                 description: The arrival time in ISO 8601 format
 *               departureTime:
 *                 type: string
 *                 format: date-time
 *                 description: The departure time in ISO 8601 format
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the flight
 *     responses:
 *       '201':
 *         description: Flight created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The flight ID
 *                 flightNumber:
 *                   type: string
 *                   description: The flight number
 *                 airplaneId:
 *                   type: integer
 *                   description: The airplane ID
 *                 departureAirportId:
 *                   type: integer
 *                   description: The departure airport ID
 *                 arrivalAirportId:
 *                   type: integer
 *                   description: The arrival airport ID
 *                 arrivalTime:
 *                   type: string
 *                   format: date-time
 *                   description: The arrival time in ISO 8601 format
 *                 departureTime:
 *                   type: string
 *                   format: date-time
 *                   description: The departure time in ISO 8601 format
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the flight
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/flights', adminCheck, 
FlightMiddlewares.validateCreateFlight,
 flightsController.create );
/**
 * @swagger
 * /api/v1/flights:
 *   get:
 *     summary: Get all flights
 *     description: Retrieve a list of all flights with optional filtering and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of flights per page (default is 10)
 *       - in: query
 *         name: arrivalAirportId
 *         schema:
 *           type: integer
 *         description: The arrival airport ID to filter flights by
 *       - in: query
 *         name: departureAirportId
 *         schema:
 *           type: integer
 *         description: The departure airport ID to filter flights by
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: float
 *         description: The minimum price to filter flights by
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: float
 *         description: The maximum price to filter flights by
 *     responses:
 *       '200':
 *         description: A JSON array of flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The flight ID
 *                   flightNumber:
 *                     type: string
 *                     description: The flight number
 *                   airplaneId:
 *                     type: integer
 *                     description: The airplane ID
 *                   departureAirportId:
 *                     type: integer
 *                     description: The departure airport ID
 *                   arrivalAirportId:
 *                     type: integer
 *                     description: The arrival airport ID
 *                   arrivalTime:
 *                     type: string
 *                     format: date-time
 *                     description: The arrival time in ISO 8601 format
 *                   departureTime:
 *                     type: string
 *                     format: date-time
 *                     description: The departure time in ISO 8601 format
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the flight
 *       '500':
 *         description: Internal server error
 */

router.get('/flights', flightsController.getAll);
/**
 * @swagger
 * /api/v1/flights/{id}:
 *   get:
 *     summary: Get a flight by ID
 *     description: Retrieve a single flight by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The flight ID
 *     responses:
 *       '200':
 *         description: A single flight
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The flight ID
 *                 flightNumber:
 *                   type: string
 *                   description: The flight number
 *                 airplaneId:
 *                   type: integer
 *                   description: The airplane ID
 *                 departureAirportId:
 *                   type: integer
 *                   description: The departure airport ID
 *                 arrivalAirportId:
 *                   type: integer
 *                   description: The arrival airport ID
 *                 arrivalTime:
 *                   type: string
 *                   format: date-time
 *                   description: The arrival time in ISO 8601 format
 *                 departureTime:
 *                   type: string
 *                   format: date-time
 *                   description: The departure time in ISO 8601 format
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the flight
 *       '404':
 *         description: Flight not found
 *       '400':
 *         description: Invalid ID supplied
 *       '500':
 *         description: Internal server error
 */
router.get('/flights/:id',flightsController.get);
//code has error fetching flight that doesn't have id

/**
 * @swagger
 * /api/v1/flights/{id}:
 *   patch:
 *     summary: Update a flight by ID
 *     description: Update the details of a flight by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The flight ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightNumber:
 *                 type: string
 *                 description: The flight number
 *               airplaneId:
 *                 type: integer
 *                 description: The airplane ID
 *               departureAirportId:
 *                 type: integer
 *                 description: The departure airport ID
 *               arrivalAirportId:
 *                 type: integer
 *                 description: The arrival airport ID
 *               arrivalTime:
 *                 type: string
 *                 format: date-time
 *                 description: The arrival time in ISO 8601 format
 *               departureTime:
 *                 type: string
 *                 format: date-time
 *                 description: The departure time in ISO 8601 format
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the flight
 *     responses:
 *       '200':
 *         description: Flight updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The flight ID
 *                 flightNumber:
 *                   type: string
 *                   description: The flight number
 *                 airplaneId:
 *                   type: integer
 *                   description: The airplane ID
 *                 departureAirportId:
 *                   type: integer
 *                   description: The departure airport ID
 *                 arrivalAirportId:
 *                   type: integer
 *                   description: The arrival airport ID
 *                 arrivalTime:
 *                   type: string
 *                   format: date-time
 *                   description: The arrival time in ISO 8601 format
 *                 departureTime:
 *                   type: string
 *                   format: date-time
 *                   description: The departure time in ISO 8601 format
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the flight
 *       '404':
 *         description: Flight not found
 *       '400':
 *         description: Invalid ID supplied
 *       '500':
 *         description: Internal server error
 */
router.patch('/flights/:id', flightsController.update)

/**
 * @swagger
 * /api/v1/airports:
 *   post:
 *     summary: Create a new airport
 *     description: Add a new airport to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The airport name
 *                 example: "John F. Kennedy International Airport"
 *               address:
 *                 type: string
 *                 description: The airport address
 *                 example: "Jamaica, NY 11430, USA"
 *               cityId:
 *                 type: integer
 *                 description: The ID of the city where the airport is located
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Airport created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The airport ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The airport name
 *                   example: "John F. Kennedy International Airport"
 *                 address:
 *                   type: string
 *                   description: The airport address
 *                   example: "Jamaica, NY 11430, USA"
 *                 cityId:
 *                   type: integer
 *                   description: The ID of the city where the airport is located
 *                   example: 1
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/airports', adminCheck , airportController.create);

router.get('/airports/:airportId', airportController.getAirportsById)

router.get('/airports/', (req, res) => {
    return res.status(400).json({
        success: false,
        message: "No Airport ID provided in req. Please provide an ID."
    });
});


module.exports = router;