// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MyERC721 {
    string public name;
    string public symbol;

    mapping(uint256 => address) private _tokenOwner;
    mapping(address => uint256) private _ownedTokensCount;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event TokenMinted(address indexed to, uint256 indexed tokenId, uint256 price);
    
    constructor() {
        name = "Cyberforge Token";
        symbol = "CFT";
    }
    // Function to mint a token with payment in Ether
    function mint(uint256 tokenId) external payable {
        address to = msg.sender; // Mint to the caller's address (Metamask connected address)
        uint256 price = msg.value; // Price sent with the transaction (in Wei)

        // Validate inputs and conditions
        require(to != address(0), "ERC721: mint to the zero address");
        require(_tokenOwner[tokenId] == address(0), "ERC721: token already minted");
        require(price > 0, "ERC721: price must be greater than zero");

        // Mint the token
        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to]++;
        emit Transfer(address(0), to, tokenId);
        emit TokenMinted(to, tokenId, price);
    }
    // Function to check the owner of a token ID
    function ownerOf(uint256 tokenId) external view returns (address) {
        return _tokenOwner[tokenId];
    } 
  // Fallback function to receive Ether
    receive() external payable {}
}
