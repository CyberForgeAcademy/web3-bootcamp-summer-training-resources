require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      url:process.env.INFURA_URL,
      accounts:[`0x`+process.env.PRIVATE_KEY],
      gasPrice: 200000000000,
    }
  }
};
