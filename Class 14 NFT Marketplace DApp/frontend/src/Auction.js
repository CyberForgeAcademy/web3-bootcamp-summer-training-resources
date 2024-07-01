import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS

import useWeb3 from './useWeb3'; // Import the Web3 hook
// Import images for NFTs
import img1 from './assets/images/two.png';
import img2 from './assets/images/eight.png';
import img3 from './assets/images/five.png';
import img4 from './assets/images/four.png';
import img5 from './assets/images/three.png';
import img6 from './assets/images/seven.png';
import img7 from './assets/images/one.png';
import img8 from './assets/images/six.png';
import Web3 from 'web3'; 



const Auction = () => {
    // // const[web3, setWeb3] = useState(null);
    // const [contractInit, setContract] = useState(null);
    
    const web3 = useWeb3(); // Get the web3 instance from the hook
    // setWeb3(web3provider);
    const [tokens, setTokens] = useState([
        { id: '1', name: 'PixelPal Hero', price: '0.000023 ETH', minted: false },
        { id: '2', name: 'Blocky Explorer', price: '0.000020 ETH', minted: false },
        { id: '3', name: 'Retro Runner', price: '0.0000012 ETH', minted: false },
        { id: '4', name: 'PixelQuest Knight', price: '0.1000022 ETH', minted: false },
        { id: '5', name: 'PixelPal Thom', price: '0.0000111 ETH', minted: false },
        { id: '6', name: 'Blocky Explorer', price: '0.998819 ETH', minted: false },
        { id: '7', name: 'Retro Runner', price: '1.000000000 ETH', minted: false },
        { id: '8', name: 'PixelQuest Knight', price: '0.00000080 ETH', minted: false },
    ]); // State to manage tokens and their minting status
    // Replace with your contract's ABI and deployed address
    const contractABI =[
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          }
        ],
        "name": "TokenMinted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ];
      const contractAddress = '0xDA2a4ACDF8fb0086f26174D5C2d1B67797D3d163'; // Replace with your deployed contract address

    // Function to mint a token
    const mintToken = async (tokenId, price) => {
        if (!web3) {
            console.error('Web3 not initialized');
            return;
        }

        try {
            const accounts = await web3.eth.getAccounts();
            const fromAddress = accounts[0]; // Use the first account (Metamask connected address)

            // Validate price (optional: you can add further validation as needed)
            if (!price ) {
                throw new Error('Invalid price');
            }
            // if ( isNaN(price)){
            //     console.log('Invalid price', typeof price, price);
            //     // convert price to int
            //     price = parseInt(price);
            // }
            // take only int part 
            price = price.split(' ')[0];

            console.log(`Minting token with ID ${tokenId} from ${fromAddress} to ${contractAddress} with price ${price} ETH...`);

            // Convert price to Wei (1 Ether = 10^18 Wei)
            const priceWei = web3.utils.toWei(price.toString(), 'ether');

            // Create a contract instance
            const myERC721 = new web3.eth.Contract(contractABI, contractAddress);
            // setContract(myERC721);
            // Mint the token to the sender's address (Metamask connected address)
            await myERC721.methods.mint(tokenId).send({
                from: fromAddress,
                to: contractAddress,
                value: priceWei, // Send the specified amount of Ether with the transaction
                gasPrice: '200000000000' // Specify the gas price as needed
            });

            console.log(`Token with ID ${tokenId} minted successfully!`);
            
            // Update tokens state to reflect minting status
            setTokens(tokens.map(token => {
                if (token.id === tokenId) {
                    return { ...token, minted: true };
                }
                return token;
            }));

        } catch (error) {
            console.error(`Error minting token: ${error.message}`);
        }
    };

    // Function to check if a token has been minted
    const checkTokenMinted = async (tokenId) => {
        if (!web3) {
            console.error('Web3 not initialized here i am ');
            return;
        }

        try {
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            
            const owner = await contract.methods.ownerOf(tokenId).call();

            // Update state based on ownership status
            if (owner !== '0x0000000000000000000000000000000000000000') {
              setTokens(tokens => tokens.map(token => {
                  if (token.id === tokenId) {
                      return { ...token, minted: true };
                  }
                  return token;
              }));
            }
        } catch (error) {
            console.error(`Error checking token minted status: ${error.message}`);
        }
    };
    
    
    const getImage = (id) => {
        return { '1': img1, '2': img2, '3': img3, '4': img4, '5': img5, '6': img6, '7': img7, '8': img8 }[id];
    }

    // call checkminted function once page is loaded 
    useEffect(() => {
      const fetchTokenData = async () => {
        if (web3) {
            for (let i = 0; i < tokens.length; i++) {
                await checkTokenMinted(tokens[i].id);
            }
        }
        else{
          console.log("web3 not found")
        }
    };

    fetchTokenData();
    },[web3]);
    return (
        <div className="auction" id="second">
            <div className="title">
                <p className="titlebold">Treanding NFTs</p>
            </div>
            <div className="nft">
                {tokens.map((token) => (
                    <div key={token.id} className="item">
                        <img className="item-img" src={getImage(token.id)} alt={`Token ${token.id}`} border="0" />
                        <div className="item-overlay">
                            {token.minted ? (
                                <button className="infobox-explorebtn already-minted-button"  type="button" disabled>Already Minted</button>
                            ) : (
                                <button className="infobox-explorebtn mint-button" type="button" onClick={() => mintToken(token.id, token.price)}>Mint NFT</button>
                            )}
                        </div>
                        <div className="item-title">
                            <p>{token.name}</p>
                            <p>{token.price}</p>
                        </div>
                        <p className="item-date">Ends in 01.34.45</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Auction;
