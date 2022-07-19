const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });
require("@nomiclabs/hardhat-waffle");
// require('hardhat-deploy-ethers');
// require('hardhat-deploy');
// require('hardhat-typechain');
// require('hardhat-gas-reporter');
// require('solidity-coverage');
// require('@typechain/ethers-v5');

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_API_KEY  = process.env.RPC_API_KEY || '';

const getRPCURL = (network) => {
  return "https://eth-"+network+".alchemyapi.io/v2/"+RPC_API_KEY;
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    ropsten: {
      url: getRPCURL('ropsten'),
      accounts:  [`${PRIVATE_KEY}`],
      chainId: chainIds.ropsten,
    },
    rinkeby: {
      url: getRPCURL('rinkeby'),
      accounts: [`${PRIVATE_KEY}`],
      chainId: chainIds.rinkeby,
    },
    bsctest: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`${PRIVATE_KEY}`],
    },
    bscmain: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.14',
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    ],
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.GAS_REPORT ? true : false,
  },
  typechain: {
    outDir: 'src/typechain',
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  paths: {
    deployments: 'src/deployments',
  }
};
