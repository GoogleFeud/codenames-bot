require("dotenv").config();

const Handler = require("./src/Discord/Handler.js");

const client = new Handler();

module.exports = client;

