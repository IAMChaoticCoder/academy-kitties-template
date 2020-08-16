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
    uint256 public GEN0_LIMIT = 10;

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

    function totalSupply() external view returns (uint256 total){
        return Dogos.length; // length (total count) of the dogo array
    }
/* getter functions created by default to state variables
    function name() external view returns (string memory tokenName){ //Returns the name of the token.
        return name;
    }
    
    function symbol() external view returns (string memory tokenSymbol){ //Returns the symbol of the token.
        return symbol;
    }
*/

    function createDogoGen0(uint _genes) public onlyOwner {
        // passing in genetic code, create the new dogo
        require(gen0Counter < GEN0_LIMIT);
        gen0Counter++;
        _createDogo(0,0,1,_genes,address(this));
    }

    function _createDogo( uint256 _momID, uint256 _dadID, uint256 _generation, uint256 _genes,address _owner) private returns (uint256){
        // create dogo from struct
        Dogo memory _dogo = Dogo({
            genes:_genes,
            birthTime: uint64(now),
            momID: uint32(_momID), 
            dadID: uint32(_dadID),
            generation: uint16( _generation)
        });
        uint256 newDogoID = Dogos.push(_dogo) -1; // start first dog index 0

        birthTransfer(address(0), newDogoID);
        emit Birth (address(0), newDogoID, _momID, _dadID, _genes); // announce transfer 
    }

    function birthTransfer(address _to, uint256 _tokenID) internal { // transfers the dogo token from msg.sender to new _to address
        address asOwner = ownerOf(_tokenID);
        require(msg.sender == asOwner); // make sure token is owned by msg.sender
        require(msg.sender == address(0)); // must be address 0
        require(msg.sender != owner); //`to` can not be the contract address
        dogoIndexToOwner[_tokenID] = _to;   // set array index of dogos to new owner
        ownershipTokenCount[_to] = SafeMath.add(ownershipTokenCount[_to],1); // add to the total owner count  ownershipTokenCount[new owner]
        ownershipTokenCount[msg.sender] = SafeMath.sub(ownershipTokenCount[msg.sender],1);  // reduce previous owner's dogo count



    }

    function transfer(address _to, uint256 _tokenID) external { // transfers the dogo token from msg.sender to new _to address
        address asOwner = ownerOf(_tokenID);
        require(msg.sender == asOwner); // make sure token is owned by msg.sender
        require(msg.sender != address(0)); //`to` cannot be the zero address
        require(msg.sender != owner); //`to` can not be the contract address
        dogoIndexToOwner[_tokenID] = _to;   // set array index of dogos to new owner
        ownershipTokenCount[_to] = SafeMath.add(ownershipTokenCount[_to],1); // add to the total owner count  ownershipTokenCount[new owner]
        ownershipTokenCount[msg.sender] = SafeMath.sub(ownershipTokenCount[msg.sender],1);  // reduce previous owner's dogo count

        emit Transfer (msg.sender, _to, _tokenID); // announce transfer 

    }
}