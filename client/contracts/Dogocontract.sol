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
    uint256 public GEN0_LIMIT = 25; //... and then there were 25. 25 Brave new Dogos.

    struct Dogo {
        uint256 genes;
        uint64 birthTime;
        uint32 momID;
        uint32 dadID;
        uint16 generation;
    }
        
    Dogo[] Dogos; //array of dogos
    mapping (uint256 => address) public dogoIndexToOwner; // map dog id to owner address
    mapping(address => uint256) ownershipTokenCount; // count of dogos belonging to an address

    uint256 public gen0Counter;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId); //when `tokenId` token is transfered from `from` to `to`.
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId); // when `owner` enables `approved` to manage the `tokenId` token.
    event Birth(address owner, uint256 dogoID, uint256 momID, uint256 dadID, uint256 genes); // when new dogo is born

    function balanceOf(address _owner) external view returns (uint256 _balance) {
        return ownershipTokenCount[_owner];
    } 

    function ownerOf(uint256 _tokenID) public view returns (address owner){
        return dogoIndexToOwner[_tokenID]; // provide the holder address from the dogo array index

    }

    function allOwned(address _address) public view returns ( uint [] memory){
        uint[] memory ownedArray = new uint[](ownershipTokenCount[_address]); //create array to hold array of IDs owned by msg.sender set max to ownedCount
        uint ownedIndex; // index for owned array
        for (uint i = 0; i < Dogos.length; i++){
            if (ownerOf(i) == _address) {
                ownedArray[ownedIndex] = i;
                ownedIndex++;
            }
        }


    }


    function _owns(address _claims, uint256 _tokenID) internal view returns (bool) {
        return dogoIndexToOwner[_tokenID] == _claims;
    }

    function totalSupply() external view returns (uint256 total){
        return Dogos.length; // length (total count) of the dogo array
    }

    function getDogo(uint _tokenID) external view returns (uint256 _genes, uint256 birthTime, uint256 _generation, uint256 _momID, uint256 _dadID, address _owner) {
        Dogo storage tempDogo = Dogos[_tokenID]; // now tempDogo contains all of Dogos array at index [tokenID] from blockchain storage
        birthTime = uint256(tempDogo.birthTime);
        _momID = uint256(tempDogo.momID);
        _dadID = uint256(tempDogo.dadID);
        _generation = uint256(tempDogo.generation);
        _genes = uint256(tempDogo.genes);
        _owner = address(ownerOf(_tokenID));
    }
    
    function createGen0Dogo(uint _genes) public onlyOwner {
        // passing in genetic code, create the new dogo
        require(gen0Counter < GEN0_LIMIT);
        gen0Counter++;
        _createDogo(0,0,1,_genes,address(this));
    }

    function _createDogo( uint256 _momID, uint256 _dadID, uint256 _generation, uint256 _genes, address _owner) private returns (uint256){
        // create dogo from struct
        Dogo memory _tempDogo = Dogo({ //instantiate tempDogo of Dogo
            genes:_genes,
            birthTime: uint64(now),
            momID: uint32(_momID), 
            dadID: uint32(_dadID),
            generation: uint16( _generation)
        });
        uint256 newDogoID = Dogos.push(_tempDogo) -1; // start first dog index 0

        _transfer(address(0), _owner, newDogoID);

        emit Birth (_owner, newDogoID, _momID, _dadID, _genes); // announce transfer 

        return newDogoID;
    }

   
    function transfer(address _to, uint256 _tokenID) external { // transfers the dogo token from msg.sender to new _to address
        require(msg.sender == address(this)); // make sure token is owned by contract
        require(msg.sender != address(0)); //`to` cannot be the zero address
        require(_owns(msg.sender, _tokenID)); //`to` can not be the contract address
        _transfer(msg.sender, _to, _tokenID); // call internal transfer to complete
    }

    function _transfer(address _from, address _to, uint256 _tokenID) internal {
        // split off transfer for re-use
        dogoIndexToOwner[_tokenID] = _to;   // set array index of dogos to new owner
        ownershipTokenCount[_to] = SafeMath.add(ownershipTokenCount[_to],1); // add to the total new owner count 

        if (_from != address(0)){ // check if there is an actual previous owner then decrease ownership count
            ownershipTokenCount[_from] = SafeMath.sub(ownershipTokenCount[msg.sender],1);  // reduce previous owner's dogo count
        }

        emit Transfer (_from, _to, _tokenID); // announce transfer 

    }
}


/*
****************************************************************************
TEST COMMANDS IN TRUFFLE CONSOLE
****************************************************************************


var instance = await Dogocontract.deployed()

instance.name()

instance.symbol()

instance.createGen0Dogo(1001) - try DNA: 10 13 96 10 10 1 1 13 13 1

*/
