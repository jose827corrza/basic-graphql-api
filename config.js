require('dotenv').config();

const config = {
    port: process.env.PORT || 3001,
    db_name: process.env.MONGO_DB_NAME,
    db_url: process.env.MONGO_URL,
    environment: process.env.ENV
};

module.exports = config;