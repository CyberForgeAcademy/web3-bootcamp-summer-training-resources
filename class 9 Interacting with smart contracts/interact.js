const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');
const { Address } = require('ethereumjs-util');

// Connect to the local blockchain (Ganache)
const web3 = new Web3('http://127.0.0.1:8545');

// Replace with your contract's ABI and deployed address
const contractABI = JSON.parse(fs.readFileSync(path.join(__dirname, 
    'artifacts/contracts/mint.sol/MyERC721.json')).toString()).abi;

// Replace with your deployed contract address
const contractAddress = '0x8fCB1C377Af3f5F470cE3631740aC0456aCC27D0'; 


// Create a contract instance
const myERC721 = new web3.eth.Contract(contractABI, contractAddress);

// Function to get accounts and mint a token
// Function to mint a token
async function mintToken() {
    const accounts = await web3.eth.getAccounts();
    // Use the first account to mint the token
    const fromAddress = accounts[0]; 
    // Replace with the recipient's address
    const toAddress = "0x36eFF5Aa8927528D652ABB95f55bB1c74b898ffD"; 
    const tokenId = 13; // Replace with the desired token ID

    console.log(`Minting token with ID ${tokenId} from ${fromAddress} to ${toAddress}...`);

    try {
        await myERC721.methods.mint(toAddress, tokenId).send({ 
            from: fromAddress,
            gasPrice: web3.utils.toWei('20', 'gwei') // Specify the gas price
        });
        console.log(`Token with ID ${tokenId} minted successfully!`);
    } catch (error) {
        console.error(`Error minting token: ${error.message}`);
    }
}
mintToken();
