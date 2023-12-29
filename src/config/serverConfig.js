 const dotenv = require('dotenv');

dotenv.config();

 module.exports = {
    PORT : process.env.PORT,
    NAME : process.env.NAME
 }