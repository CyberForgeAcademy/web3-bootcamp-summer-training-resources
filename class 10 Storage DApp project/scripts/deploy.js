const hre = require("hardhat");

async function main() {
    const Contract = await hre.ethers.getContractFactory("Storage");
    const mycontract = await Contract.deploy();
    
    await mycontract.waitForDeployment();
    
    console.log("Contract deployed to:",await mycontract.getAddress());
}

main()

