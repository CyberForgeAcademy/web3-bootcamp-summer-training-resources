const hre = require("hardhat");

async function main() {
    const Minter = await hre.ethers.getContractFactory("MyERC721");
    const minter = await Minter.deploy();
    
    await minter.waitForDeployment();
    
    console.log("Contract deployed to:",await minter.getAddress());
}

main()
