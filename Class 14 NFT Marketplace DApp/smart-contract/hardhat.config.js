require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    ganache:{
      url:"http://127.0.0.1:8545",
      accounts:["0xcf68c6ed901e7e00cdba49422e4b6ce4835b76a853ec40ad6db518e0511fe7bc"]
    }
  }
};
