// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CyberForgeToken {
    // Token details
    string private _name = "CyberForge Token";
    string private _symbol = "CFT";
    uint8 private _decimals = 18; // Standard number of decimal places for ERC20 tokens
    uint256 private _totalSupply ; // Total supply of tokens
    uint256 private _initialSupply = 100; // Initial supply of tokens

    // Map storing balance in each address
    mapping(address => uint256) private balances;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Constructor to mint initial supply
    constructor() {
        _totalSupply = _initialSupply * 10 ** uint256(_decimals);
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    // Getter methods for name, symbol, decimals and totalSupply
    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // Function to check the balance of an address
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    // Function to transfer tokens
    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(recipient != address(0), "Cannot transfer to the zero address");
        require(balances[msg.sender] >= amount, "Transfer amount exceeds balance");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }



}