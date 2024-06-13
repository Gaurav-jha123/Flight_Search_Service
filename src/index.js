const express = require("express");
const { NAME } = require('./config/serverConfig');
//const { PORT } = require('./config/serverConfig');
const db = require('./models/index');
const { Airplane } = require('./models/index');
const PORT = process.env.PORT || 3001;
const sequelize = require('sequelize');
const ApiRoutes = require('./routes/index'); // right now having only V1
const bodyParser = require("body-parser");
const dotenv = require('dotenv');


const {Airpots, City} = require('./models/index');
const city = require("./models/city");

const setupAndStartServer = async => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api' , ApiRoutes);// any route starting with api goes to v1 for now 
    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter: true});
        }
        // await Airplane.create({
        //     modelNumber : 'Bombardier CRJ'
        // })
    });
}

setupAndStartServer();