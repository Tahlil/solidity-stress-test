const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/Oracle.sol/Oracle.json");
const abi = contract.abi;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_API_KEY  = process.env.RPC_API_KEY || '';

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", RPC_API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const oracleContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

