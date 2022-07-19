require('dotenv').config();
let request = require("request");

const apiKey = process.env.API_KEY;

const players = [
    "Rubye Baumbach","Yvonne Gaylord IV","Erling Emard","Mrs. Elwin Weber","Fern Labadie","Ardella Will","Ramon Boyle","Elyssa Hane","Opal Romaguera II","Rhett Klocko","Odie Monahan","April Ratke","Jayne Hessel","Garett DuBuque","Cyril Morar","Dedrick Bayer","Abdullah Franecki","Laverna Lemke","Hilda Wehner","Dane Crona","Miles Kshlerin","Julius Donnelly","Autumn Grady","Millie Gaylord","Jarred Nader","Anabelle Doyle","Stevie Stark","Bud West","Kellie Carter","Alfonzo Walker III","Abby Braun","Giovani Williamson","Assunta Hermann","Jace Crooks","Layne Gislason","Kiel Farrell","Arlo Blick","Cecil Abshire IV","Braxton Quigley","Elvie Simonis","Ana O'Conner","Jayde Hane","Jayne Goyette","Alvina Schimmel","Frank Dach","Carey Effertz","Jasen Morar","Wilhelm Kozey MD","Ebba Runte","Chloe Stiedemann"
]

const getRandomIndexes = (length, size) => {
    const indexes = [];
    const created = {};
  
    while (indexes.length < size) {
      const random = Math.floor(Math.random() * length);
      if (!created[random]) {
        indexes.push(random);
        created[random] = true;
      }
    }
    return indexes;
  };

function getNRandomPlayers(n) {
    return getRandomIndexes(players.length, n).map(i => players[i]).join(",");
}

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
        let randomPlayers = getNRandomPlayers()
    }
	console.log(body.response.length);
});