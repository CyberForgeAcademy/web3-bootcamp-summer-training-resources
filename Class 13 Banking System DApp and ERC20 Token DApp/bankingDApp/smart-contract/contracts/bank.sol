// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleBank {

    // Mapping to store the balance of each address
    mapping(address => uint) private balances;

    // Function to deposit Ether into the bank
    function deposit() public payable {
        if (msg.value > 0) {
            balances[msg.sender] += msg.value;
        } else {
            revert("Deposit amount must be greater than zero");
        }
    }
    // Function to withdraw Ether from the bank
    function withdraw(uint _amount) public {
        if (_amount <= balances[msg.sender]) {
            balances[msg.sender] -= _amount;
            payable(msg.sender).transfer(_amount);
        } else {
            revert("Insufficient balance");
        }
    }
    // Function to check the balance of the caller
    function checkBalance() public view returns (uint) {
        return balances[msg.sender];
    }
    // Function to transfer funds to another address
    function transfer(address _to, uint256 _amount) public {
        require(_amount <= balances[msg.sender], "Insufficient balance");
        require(_to != address(0), "Invalid address");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }
}