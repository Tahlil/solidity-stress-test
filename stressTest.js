const { ethers } = require("hardhat");
const contract = require("./artifacts/contracts/Oracle.sol/Oracle.json");
const abi = contract.abi;
const dotenv = require('dotenv');
const path = require('path');
const JFile=require('jfile');
const fs = require('fs');



dotenv.config({ path: path.resolve(__dirname, '.env') });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_API_KEY  = process.env.RPC_API_KEY || '';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", RPC_API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const oracleContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

function convertToJson() {
  const allMatches=new JFile("data.txt").lines;
  const totalMatches = allMatches.length;
  let finalJsonObj = [];
  for (let index = 0; index < totalMatches; index++) {
    const match = allMatches[index];
    let splited = match.split(",");
    let scorers = [];
    let scores = [];
    if(splited.length> 4){
      let scorerAndScoreInfo = splited.slice(4);
      const half = scorerAndScoreInfo.length/2;
      scorers = scorerAndScoreInfo.slice(0, half);
      scores = scorerAndScoreInfo.slice(half).map(i=>Number(i));;
    }
    let newMatch = {
      home: splited[0].trim(),
      away: splited[1].trim(),
      homeGoals: parseInt(splited[2]),
      awayGoals: parseInt(splited[3]),
      scorers: scorers,
      scores: scores
    }
    finalJsonObj.push(newMatch);
  }
  console.log("Final object size", finalJsonObj.length);
  let data = JSON.stringify(finalJsonObj, null, 2);

  fs.writeFile('data.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}

function getTime() {
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(time);

}

async function main() {
  let matchdata = fs.readFileSync('data.json');
  let allData = JSON.parse(matchdata);
  let totalMatches = allData.length;
  console.log("Number of matches", totalMatches);
  let totalGasUsed = 0;
  getTime()
  for (let index = 0; index < totalMatches; index++) {
    try {
      const match = allData[index];
      console.log("Adding a new team:");
      const tx = await oracleContract.addMatch("La Liga-2016", match.home, match.away, match.homeGoals, match.awayGoals, match.scorers, match.scores);
      let reciept = await tx.wait();
      console.log(reciept.gasUsed);
      totalGasUsed += reciept.gasUsed.toNumber();
      console.log("Added " + (index+1) + " matches");
    } catch (error) {
      console.log("Error occured at", index, error);
    }
  }
  getTime()

  console.log("Total gas used", totalGasUsed);
    // console.log("Adding a new team:");
    // const tx = await oracleContract.addMatch("La Liga-2021", "ab", "cd'", 2, 1, ["test name", "other name"], [2,1]);
    // await tx.wait();
  let matchDetails = await oracleContract.getMatch("La Liga-2021");
  console.log("Total matches in a Liga-2021 added on the contract: ", matchDetails.length);
  matchDetails = await oracleContract.getMatch("La Liga-2020");
  console.log("Total matches a Liga-2020 added on the contract: ", matchDetails.length);
  matchDetails = await oracleContract.getMatch("La Liga-2019");
  console.log("Total matches a Liga-2019 added on the contract: ", matchDetails.length);
  matchDetails = await oracleContract.getMatch("La Liga-2018");
  console.log("Total matches a Liga-2018 added on the contract: ", matchDetails.length);
  matchDetails = await oracleContract.getMatch("La Liga-2017");
  console.log("Total matches a Liga-2017 added on the contract: ", matchDetails.length);
  matchDetails = await oracleContract.getMatch("La Liga-2016");
  console.log("Total matches a Liga-2016 added on the contract: ", matchDetails.length);
}

  main();
  // convertToJson();

