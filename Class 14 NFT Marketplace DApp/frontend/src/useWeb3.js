import { useState, useEffect } from 'react';
import { Web3 } from 'web3';

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
        console.log('Web3 initialized');
      // Modern dapp browsers
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access if neededconst web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          setWeb3(web3Instance);
        } catch (error) {
          console.error('User denied account access');
        }
      }
      // Legacy dapp browsers
      else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      }
      // Non-dapp browsers
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    initWeb3();
  }, []);

  return web3;
};

export default useWeb3;
