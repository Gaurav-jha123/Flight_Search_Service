const express = require("express");
const { NAME } = require('./config/serverConfig');
const { PORT } = require('./config/serverConfig');

const ApiRoutes = require('./routes/index'); // right now having only V1
const bodyParser = require("body-parser");


const setupAndStartServer = async => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api' , ApiRoutes);// any route starting with api goes to v1 for now 
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        // console.log(process.env);
        //console.log(NAME);
    })
}

setupAndStartServer();