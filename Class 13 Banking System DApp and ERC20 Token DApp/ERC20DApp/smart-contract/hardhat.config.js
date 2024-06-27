require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    ganache:{
      url:"http://127.0.0.1:8545",
      accounts:["0x5b8b636c5d739dbd4db9aa8ab9ee12311fa170b5ce8d59435618336632640778"]
    }
  }
};
