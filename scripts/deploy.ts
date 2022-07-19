const { ethers } = require("hardhat");
async function main() {
  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy();

  const tx = await oracle.deployed();
  console.log("Deployed address", tx.address);
  const estimatedGas = await ethers.provider.estimateGas(tx.deployTransaction.data)
  console.log("Estimated Gas", estimatedGas);
  
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
