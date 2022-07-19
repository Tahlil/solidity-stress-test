const { ethers } = require("hardhat");
const contract = require("./artifacts/contracts/Oracle.sol/Oracle.json");
const abi = contract.abi;
const dotenv = require('dotenv');
const path = require('path');

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

async function main() {
    let matchDetails = await oracleContract.getMatch("laLiga-2020");
    console.log(matchDetails);
   
    console.log("Adding a new team:");
    const tx = await oracleContract.addMatch("La Liga-2020", "ab", "cd'", 2, 1, ["test name", "other name"], [2,1]);
    await tx.wait();

    matchDetails = await oracleContract.getMatch("La Liga-2020");
    console.log(matchDetails);
  
  }
  main();

