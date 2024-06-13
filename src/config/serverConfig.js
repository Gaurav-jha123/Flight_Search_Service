const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  NAME: process.env.NAME,
  DEV_USERNAME: process.env.DEV_USERNAME,
  DEV_PASSWORD: process.env.DEV_PASSWORD,
  DEV_DATABASE: process.env.DEV_DATABASE,
  DEV_HOST: process.env.DEV_HOST,
  DEV_PORT: process.env.DEV_PORT,
};
