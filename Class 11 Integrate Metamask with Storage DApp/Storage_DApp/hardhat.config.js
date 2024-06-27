require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    ganache:{
      url :"http://127.0.0.1:8545",
      accounts:["0x1e7ca82b28be9fd49424c3e1864ce9e0b6b13a72408ac17c97c117e2c3445cfc"]
    }
  }
};
