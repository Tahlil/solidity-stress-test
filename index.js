require('dotenv').config();
const fs = require('fs')
let request = require("request");

const apiKey = process.env.API_KEY;

const players = [
    "Rubye Baumbach","Yvonne Gaylord IV","Erling Emard","Mrs. Elwin Weber","Fern Labadie","Ardella Will","Ramon Boyle","Elyssa Hane","Opal Romaguera II","Rhett Klocko","Odie Monahan","April Ratke","Jayne Hessel","Garett DuBuque","Cyril Morar","Dedrick Bayer","Abdullah Franecki","Laverna Lemke","Hilda Wehner","Dane Crona","Miles Kshlerin","Julius Donnelly","Autumn Grady","Millie Gaylord","Jarred Nader","Anabelle Doyle","Stevie Stark","Bud West","Kellie Carter","Alfonzo Walker III","Abby Braun","Giovani Williamson","Assunta Hermann","Jace Crooks","Layne Gislason","Kiel Farrell","Arlo Blick","Cecil Abshire IV","Braxton Quigley","Elvie Simonis","Ana O'Conner","Jayde Hane","Jayne Goyette","Alvina Schimmel","Frank Dach","Carey Effertz","Jasen Morar","Wilhelm Kozey MD","Ebba Runte","Chloe Stiedemann"
]

async function writeArrayToFile(array) {
    await fs.writeFileSync('data.txt', array.join('\n '));
}

const getRandomNumber = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

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

request(options, async function (error, response, body) {
	if (error) throw new Error(error);
    const allMatches= body.response;

    let allResults = [];
    let fixture = "";
    console.log(allMatches.length);

    for (let index = 0; index < allMatches.length; index++) {
        fixture = "";
        const match = allMatches[index];
        fixture += match.teams.home.name + "," + match.teams.away.name + "," + match.goals.home + "," + match.goals.away;
        let goals = getRandomNumber(0, match.goals.home+match.goals.away);
        const randomPlayers = getNRandomPlayers(goals)
        if (randomPlayers.length > 0) {
            let individualGoalsScored = Array.from({length: goals}, () => Math.floor(Math.random() * goals)).join(",");
            fixture += ("," + randomPlayers+","+individualGoalsScored);
        }
        allResults.push(fixture);
    }
    console.log(allResults.length);
	await writeArrayToFile(allResults);
});


