// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyERC721 {
    string public name;
    string public symbol;

    mapping(uint256 => address) private _tokenOwner;
    mapping(address => uint256) private _ownedTokensCount;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function mint(address to, uint256 tokenId) external {
        require(to != address(0), "ERC721: mint to the zero address"); //zero address i.e 0x0000000000000000000000000000000000000000
        require(_tokenOwner[tokenId] == address(0), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to]++;
        emit Transfer(address(0), to, tokenId);
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    function balanceOf(address owner) external view returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _ownedTokensCount[owner];
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        address owner = _tokenOwner[tokenId];
        require(from == owner || _tokenApprovals[tokenId] == msg.sender || _operatorApprovals[owner][msg.sender],
            "ERC721: transfer caller is not owner nor approved");

        require(to != address(0), "ERC721: transfer to the zero address");

        _tokenApprovals[tokenId] = address(0);
        _ownedTokensCount[from]--;
        _ownedTokensCount[to]++;
        _tokenOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }
}
