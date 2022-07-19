require('dotenv').config();
let request = require("request");

const apiKey = process.env.API_KEY;

var options = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/fixtures',
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': apiKey
  },
  qs: {
      'league':140,
      'season': 2021
  },
  json: true
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
    const allMatches= body.results;
	console.log();
    let allResults = [];
    for (let index = 0; index < array.length; index++) {
        let fixture = "";
        const match = body.response[index];
        fixture += match.teams.home.name + "," + match.teams.away.name + "," + match.goals.home + "," + match.goals.away;
    }
	console.log(body.response.length);
});