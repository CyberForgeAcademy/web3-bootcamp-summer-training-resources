import React , { useEffect , useState} from "react";
import { Web3 } from "web3";
import './SimpleBank.css';


const SimpleBank = () => {
    const [userAddress, setUserAddress] = useState('');
  const [userBalance, setUserBalance] = useState('0');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractBalance, setContractBalance] = useState('0');

  const contractAddress = '0x2Ed762c8C3191743540E5BaCD2f0e62B95b00216';
  const contractABI =  [
    {
      "inputs": [],
      "name": "checkBalance",
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
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_accounts' });
          const accounts = await web3.eth.getAccounts();
          const userAddress = accounts[0];
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          const contractBalance = await web3.eth.getBalance(contractAddress);
          const contractBalanceInEth = web3.utils.fromWei(contractBalance, 'ether');

          setWeb3(web3);
          setUserAddress(userAddress);
          setContract(contract);
          setContractBalance(contractBalanceInEth);

          const balance = await web3.eth.getBalance(userAddress);
          setUserBalance(web3.utils.fromWei(balance, 'ether'));
        } catch (error) {
          console.error('Error connecting to Metamask', error);
        }
      } else {
        console.error('Metamask is not installed');
      }
    };

    init();
  }, []);

  const connect = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      setWeb3(web3);
      setUserAddress(userAddress);
      setContract(contract);

      const balance = await web3.eth.getBalance(userAddress);
      setUserBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
      console.error('Error connecting to Metamask', error);
    }
  }
 
  const deposit = async () => {
    const depositAmount = document.getElementById('depositAmount').value;
    try {
  
      const tx = await contract.methods.deposit().send({ from: userAddress,
         value: web3.utils.toWei(depositAmount, 'ether'),
        
         gasPrice : web3.utils.toWei('0.0001', 'gwei')});
      alert('Deposit successful');
      const balance = await web3.eth.getBalance(userAddress);
      setUserBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
      console.error('Error during deposit', error);
    }
  };

  const withdraw = async () => {
    const withdrawAmount = document.getElementById('withdrawAmount').value;
    try {
      const tx = await contract.methods.withdraw(web3.utils.toWei(withdrawAmount, 'ether')).send({ from: userAddress
        , gasPrice : web3.utils.toWei('0.0001', 'gwei')
       });
      alert('Withdraw successful');
      const balance = await web3.eth.getBalance(userAddress);
      setUserBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
      console.error('Error during withdrawal', error);
    }
  };

  const transfer = async () => {
    const transferTo = document.getElementById('transferTo').value;
    const transferAmount = document.getElementById('transferAmount').value;
    try {
      console.log('transferTo', transferTo, transferAmount);
      console.log('finalAmount', typeof  transferAmount);
      // convert finalAmount to integer
      const tx = await contract.methods.transfer(transferTo, web3.utils.toWei(transferAmount, 'ether')).send({ 
            from: userAddress,
            value: web3.utils.toWei(transferAmount, 'ether'),
            to: transferTo,

            gasPrice : web3.utils.toWei('0.0001', 'gwei')
         });

      
      // Log transaction hash for debugging
      console.log('Transaction Hash:', tx.transactionHash);

      alert('Transfer successful');
      const balance = await web3.eth.getBalance(userAddress);
      setUserBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
      console.error('Error during transfer', error);
    }
  };


    return(
        <div className="container">
      <h1 className='pb-4 text-center'>Banking System</h1>
      <div className="form-group text-center">
        {userAddress ? (
          <button className="btn btn-success" disabled>Connected at {userAddress}</button>
        ) : (
          <button className="btn btn-primary" onClick={connect}>Connect Wallet</button>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="contractBalance">Contract Balance:</label>
        <input type="text" className="form-control" id="contractBalance" value={contractBalance} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="userAddress">Your Address:</label>
        <input type="text" className="form-control" id="userAddress" value={userAddress} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="userBalance">Your Balance (ETH):</label>
        <div className="input-group">
          <input type="text" className="form-control" id="userBalance" value={userBalance} readOnly />
          <div className="input-group-append">
            <span className="input-group-text">ETH</span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="depositAmount">Deposit Amount (ETH):</label>
        <div className="input-group">
          <input type="number" className="form-control" id="depositAmount" />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={deposit}>Deposit</button>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="withdrawAmount">Withdraw Amount (ETH):</label>
        <div className="input-group">
          <input type="number" className="form-control" id="withdrawAmount"  />
          <div className="input-group-append">
            <button className="btn btn-danger" onClick={withdraw}>Withdraw</button>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="transferTo">Transfer To Address:</label>
        <input type="text" className="form-control" id="transferTo"  />
      </div>
      <div className="form-group">
        <label htmlFor="transferAmount">Transfer Amount (ETH):</label>
        <div className="input-group">
          <input type="number" className="form-control" id="transferAmount" step="0.01" placeholder="Enter Amount"  />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={transfer}>Transfer</button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default SimpleBank;