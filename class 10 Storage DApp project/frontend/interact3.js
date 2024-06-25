
// Define the contract ABI
const contractAbi =  [
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

// Connect to MetaMask provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Define the contract address
const contractAddress = '0x212D2004754B369364644425e0C3E450aCC5c0e4'; // Replace with your actual contract address

// Instantiate the contract object with the ABI and contract address
const storageContract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());

var accounts;

// connect with wallet 
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected:', accounts[0]);

            document.getElementById('connect').textContent = 'Connected to MetaMask :' + accounts[0];

        } catch (error) {
            console.error('Error connecting to the wallet:', error);
            alert('Error connecting to the wallet. Check the console for details.');
        }
    } else {
        alert('Please install MetaMask to connect to the Ethereum network');
    }
}

async function interactWithContract(value) {
    // Request account access if needed
    await provider.send("eth_requestAccounts", []);

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


document.getElementById("connect").addEventListener("click", function() {
    connectWallet().catch(console.error);
}
);