

// Load the contract ABI (Application Binary Interface)
const contractAbi = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Connect to a local or remote Ethereum node
const web3 = new Web3("http://127.0.0.1:8545");

// Instantiate the contract object with the ABI and contract address
const contractAddress = '0x38e2C2Fdd96E814929A4365912251c04C2393a14'; // Replace with your actual contract address
const storageContract = new web3.eth.Contract(contractAbi, contractAddress);

// Example interaction with the contract
async function interactWithContract(value) {
    // Get the current stored number
    console.log("Interacting with the contract at address " + contractAddress);
    
    // Store a new number (e.g., 123)
    const newValue = value;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        throw new Error('No accounts found');
    }
    const fromAddress = accounts[0]; // Use the first account 

    await storageContract.methods.store(newValue).send(
        { from: fromAddress, 
            gasPrice: web3.utils.toWei('20', 'gwei') // Specify the gas price as needed
        }
    );
    document.getElementById("msg").innerHTML = "Stored " + newValue + " in the contract at address " + contractAddress;
}
async function getStoredValue() {
    const currentValue = await storageContract.methods.retrieve().call();
    console.log('Current value in storage:', currentValue);
    document.getElementById("output").innerHTML = currentValue;
}

document.getElementById("set").addEventListener("click", function() {
    interactWithContract(document.getElementById("input").value).catch(console.error);
});

document.getElementById("get").addEventListener("click", function() {
    getStoredValue().catch(console.error);
    document.getElementById("msg").innerHTML = "Retrieved value from the contract at address " + contractAddress;
});