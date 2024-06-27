import React, { useState, useEffect } from 'react';
import { Web3 } from 'web3';
import './App.css';

const Counter2 = () => {
const [count, setCount] = useState(0);
const [contract, setContract] = useState(null);
const [provider, setProvider] = useState(null);
const [account, setAccount] = useState('');

useEffect(() => {
    // Load MetaMask provider
    const loadWeb3 = async () => {
        if (window.ethereum) {
            const provider = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await provider.eth.getAccounts();
            setAccount(accounts[0]);
            setProvider(provider);
            // Load smart contract
            
            const contractAddress = "0xa658Bb976341Cec25f1A319Ff68C2EF051983113"
        
            const contractAbi= [
              {
                "inputs": [],
                "name": "count",
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
                "inputs": [],
                "name": "getCount",
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
                "inputs": [],
                "name": "increment",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ];

            const counterContract = new provider.eth.Contract(contractAbi, contractAddress);
            setContract(counterContract);
        }
    }

    loadWeb3();
},[]);

    // Update count from the contract
useEffect(() => {
    const getCount = async () => {
        if (contract) {
            const currentCount = await contract.methods.getCount().call();
            setCount(currentCount.toString());
        }
    };
    getCount();
});
const increment = async () => {
    if (contract) {
        await contract.methods.increment().send({ 
            from : account,
            gasPrice : provider.utils.toWei('10', 'gwei')
         });
        
         window.location.reload();
        // getCount();
    }
};

return (
    <div className='App-header'>
    <h2>Counter DApp</h2>
    <p>Count from contract: {count}</p>
    <button className='button btn btn-warning' onClick={increment}>Increment Count</button>
    </div>
);
};

export default Counter2;

