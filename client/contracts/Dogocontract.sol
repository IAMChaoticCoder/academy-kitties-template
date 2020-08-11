// SPDX-License-Identifier: MIT
pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./Safemath.sol";

contract Ownable{
    address public owner;



    modifier onlyOwner(){
        require(msg.sender == owner);
        _; //Continue execution
    }

    constructor() public{
        owner = msg.sender;
    }
}

contract Dogocontract is IERC721 , Ownable {
    string public constant name = "CryptoDogos";
    string public constant symbol = "CDO";

    struct Dogo {
        uint256 genes;
        uint64 birthTime;
        uint32 momID;
        uint32 dadID;
        uint16 generation;
    }
        
    Dogo[] dogos; //array of dogos
    mapping (uint256 => address) public dogoIndexToOwner; // map dog id to owner address
    mapping(address => uint256) ownershipTokenCount; // count of dogos belonging to an address

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId); //when `tokenId` token is transfered from `from` to `to`.
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId); // when `owner` enables `approved` to manage the `tokenId` token.

    function balanceOf(address _owner) external view returns (uint256 _balance) {
        return ownershipTokenCount[_owner];
    } 

    function ownerOf(uint256 _tokenID) external view returns (address owner){
        return dogoIndexToOwner[_tokenID]; // provide the holder address from the dogo array index

    }

    function totalSupply() external view returns (uint256 total){
        return dogos.length; // length (total count) of the dogo array
    }

    function name() external view returns (string memory tokenName){ //Returns the name of the token.
        return name;
    }
    
    function symbol() external view returns (string memory tokenSymbol){ //Returns the symbol of the token.
        return symbol;
    }

    function transfer(address _to, uint256 _tokenID) external { // transfers the dogo token from msg.sender to new _to address
        require(msg.sender = ownerOf(_tokenID)); // make sure token is owned by msg.sender
        require(msg.sender != account[0]); //`to` cannot be the zero address
        require(msg.sender != owner); //`to` can not be the contract address
        dogoIndexToOwner[_tokenID] = _to;   // set array index of dogos to new owner
        ownershipTokenCount[_to]++; // add to the total owner count  ownershipTokenCount[new owner]
        ownershipTokenCount[msg.sender]--;  // reduce previous owner's dogo count

        emit Transfer (msg.sender, _to, _tokenID); // announce transfer 

    }
}