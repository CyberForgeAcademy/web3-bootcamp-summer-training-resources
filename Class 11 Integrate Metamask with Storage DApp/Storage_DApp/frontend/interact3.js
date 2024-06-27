
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

  
const contractAddress = "0xD8bDE81018E83186556b510bE3A34E99688C40EA";
// const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
// const privatekey = "0x8d519069b85cc8e0f93288b0edc43f7621611af76873e30b72bd484dd152718b";

// const wallet  = new ethers.Wallet(privatekey,provider);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const storageContract =  new ethers.Contract(contractAddress,contractAbi,provider.getSigner());
var accounts;

async function connectWallet(){
    if (typeof window.ethereum !== 'undefined') {
        try{
            accounts= await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected:",accounts[0]);

            document.getElementById("connect").textContent= "Connected to Metamask: " + accounts[0];
        }
        catch(error){
            console.error(error);
            alert("Error connecting to Metamask");
        }
    }
    else{
        alert("Please install Metamask")
    }
}


async function interactWithContract(value){
    const newValue = value;

    const  tx = await storageContract.store(newValue, {
        gasPrice: ethers.utils.parseUnits("20", "gwei")
    });


    await tx.wait();

    document.getElementById("msg").innerHTML = "Stored " + newValue + " in the contract at address " + contractAddress;
}


async function getStoredValue(){
    const currentValue =  await storageContract.retrieve();
    console.log("Current value in the contract is " + currentValue.toString());
    document.getElementById("msg").innerHTML = "Current value in the contract is " + currentValue.toString();
    document.getElementById("output").innerHTML = currentValue.toString();

}


document.getElementById("set").addEventListener("click",function(){
    interactWithContract(document.getElementById("input").value);
});

document.getElementById("get").addEventListener("click",function(){
    getStoredValue();
});

document.getElementById("connect").addEventListener("click",function(){
    connectWallet();
});