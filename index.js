require('dotenv').config();
let request = require("request");

const apiKey = process.env.API_KEY;

var options = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/leagues',
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': apiKey
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});