const express = require("express");
const { NAME } = require('./config/serverConfig');
const { PORT } = require('./config/serverConfig');
const CityRepository = require('./repository/city-repository');
const bodyParser = require("body-parser");


const setupAndStartServer = async => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        // console.log(process.env);
        console.log(NAME);
        const repo = new CityRepository();
        repo.creatCity({name : "JSR",});
    })
}

setupAndStartServer();