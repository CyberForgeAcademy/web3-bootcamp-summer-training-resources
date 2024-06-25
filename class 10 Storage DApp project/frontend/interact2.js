
// Define the contract ABI
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
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// Define the contract address
const contractAddress = '0x38e2C2Fdd96E814929A4365912251c04C2393a14'; // Replace with your actual contract address

// Define a wallet to sign transactions (use your own private key)
const privateKey = '0x1d8fe735174d1e190a92b4326be5fa69841da1b93f4f1616c576cb87da2eaa17'; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Instantiate the contract object with the ABI, contract address, and signer
const storageContract = new ethers.Contract(contractAddress, contractAbi, wallet);

// Example interaction with the contract
async function interactWithContract(value) {
    // Store a new number
    const newValue = value;

    const tx = await storageContract.store(newValue, {
        gasPrice: ethers.utils.parseUnits('20', 'gwei'), // Specify the gas price as needed
    });
    
    // Wait for the transaction to be mined
    await tx.wait();

    document.getElementById("msg").innerHTML = "Stored " + newValue + " in the contract at address " + contractAddress;
}

async function getStoredValue() {
    const currentValue = await storageContract.retrieve();
    console.log('Current value in storage:', currentValue.toString());
    document.getElementById("output").innerHTML = currentValue.toString();
}

// Run the interaction
document.getElementById("set").addEventListener("click", function() {
    interactWithContract(document.getElementById("input").value).catch(console.error);
});

document.getElementById("get").addEventListener("click", function() {
    getStoredValue().catch(console.error);
    document.getElementById("msg").innerHTML = "Retrieved value from the contract at address " + contractAddress;
});
