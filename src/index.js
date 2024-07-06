const express = require("express");
const db = require('./models/index');
const PORT = process.env.PORT || 3001;
const ApiRoutes = require('./routes/index'); // right now having only V1
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger');

const cors = require('cors');
const setupAndStartServer = async => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
        process.exit(1); 
    });
    
    app.use('/api' , ApiRoutes); 
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter: true});
        }
    });
}

setupAndStartServer();