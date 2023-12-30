#Project Setup 
-git clone with url
-`npm install` to setup all node related modules it should be in the root directory of the project 
- Create a `.env` file in root to config the environment variables
- Inside the `src/config` folder create a new `config.json` file to setup the db 
 "development": {
    "username": "db_login_name",
    "password": "your_password" or null in case of no password,
    "database": "db_name",
    "host": "127.0.0.1",
    "dialect": "mysql"