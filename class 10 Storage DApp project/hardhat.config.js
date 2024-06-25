require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: ["0x2d55f7cf5da91de32e0012d18d8622d47cb53bac84c2999e2e3e49941239759c",],
    },
  },
};
