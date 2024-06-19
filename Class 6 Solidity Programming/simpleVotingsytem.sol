// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVoting {

    // Declare a struct to represent a candidate
    struct Candidate {
        string name;
        uint voteCount;
    }

    // State variable to store an array of candidates
    Candidate[] public candidates;

    // State variable to store the addresses of voters
    mapping(address => bool) public voters;

    // Function to add a new candidate
    function addCandidate(string memory _name) public {
        candidates.push(Candidate(_name, 0));
    }

    // Function to vote for a candidate
    function vote(uint _candidateIndex) public {
        // Check if the voter has already voted
        if (voters[msg.sender]) {
            revert("You have already voted.");
        }

        // Check if the candidate index is valid
        if (_candidateIndex >= candidates.length) {
            revert("Invalid candidate index.");
        }

        // Record the voter's address
        voters[msg.sender] = true;

        // Increment the candidate's vote count
        candidates[_candidateIndex].voteCount++;
    }

    // Function to get the total number of candidates
    function getTotalCandidates() public view returns (uint) {
        return candidates.length;
    }

    // Function to get a candidate's details by index
    function getCandidate(uint _index) public view returns (string memory, uint) {
        if (_index >= candidates.length) {
            revert("Index out of bounds");
        }
        Candidate storage candidate = candidates[_index];
        return (candidate.name, candidate.voteCount);
    }

    // Function to get the winner of the election
    function getWinner() public view returns (string memory) {
        uint maxVotes = 0;
        string memory winnerName;

        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerName = candidates[i].name;
            }
        }

        return winnerName;
    }
}