const hre = require("hardhat");

async function main() {

    const Contract = await hre.ethers.getContractFactory("MyERC721");

    const contract = await Contract.deploy();

    await contract.waitForDeployment();

    console.log("Contract deployed to address:",await contract.getAddress());
}

main();
