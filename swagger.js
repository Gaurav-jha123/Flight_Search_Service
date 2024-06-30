const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', 
    info: {
      title: 'Flight Search API', 
      version: 'latest',
      description: 'API documentation for Flight Search Service',
    },
    servers: [
      {
        url: 'https://flight-search-service.onrender.com',
        //url: 'http://localhost:3000', un commnet this tor tun this on localhost

        description: 'Prod server',
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/routes/v1/index.js'], // Path to the API routes files (patterns)
};

const specs = swaggerJsdoc(options);

module.exports = specs;
