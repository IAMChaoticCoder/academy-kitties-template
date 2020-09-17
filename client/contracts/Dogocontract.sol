// SPDX-License-Identifier: MIT
pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./Safemath.sol";
import "./IERCReceiver.sol";

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

    bytes4 internal constant SPECIAL_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

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
    mapping (uint256 => address) public dogoIndexToApproved; // mapping to authorize trading
    mapping (address => mapping (address => bool)) private _operatorApprovals; // third party permission from owner address to "operator"
        // e.g. _operatorApprovals[MYADDR][OPERATORADDR] = true;

    uint256 public gen0Counter;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId); //when `tokenId` token is transfered from `from` to `to`.
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId); // when `owner` enables `approved` to manage the `tokenId` token.
    event Birth(address owner, uint256 dogoID, uint256 momID, uint256 dadID, uint256 genes); // when new dogo is born
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved); // event when an address is approved for all tokens
    
    function supportsInterface(bytes4 _interfaceId) external pure returns (bool){
        return(_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165); // adhering to token standard to allow user to know supported interfaces
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenID, bytes memory _data) internal {
        _transfer(_from, _to, _tokenID);
        require(_checkERC721Support( _from,  _to,  _tokenID,  _data));
   
    }

    function balanceOf(address _owner) external view returns (uint256 _balance) {
        return ownershipTokenCount[_owner];
    } 

    function ownerOf(uint256 _tokenID) public view returns (address owner){
        require(_tokenID < Dogos.length); // make sure dogo exists  
        return dogoIndexToOwner[_tokenID]; // provide the holder address from the dogo array index

    }

    function allOwned(address _address) public view returns ( uint [] memory){
        uint[] memory ownedArray = new uint[](ownershipTokenCount[_address]); //create array to hold array of IDs owned by msg.sender set max to ownedCount
        uint ownedIndex = 0; // index for owned array
        for (uint i = 0; i < Dogos.length; i++){
            if (ownerOf(i) == _address) {
                ownedArray[ownedIndex] = i;
                ownedIndex++;
            }
        }
        return ownedArray;

    }


    function _owns(address _claims, uint256 _tokenID) internal view returns (bool) {
        return dogoIndexToOwner[_tokenID] == _claims;
    }
    
    function _operatorFor(address _claims, uint256 _tokenID) internal view returns (bool) {
        return dogoIndexToApproved[_tokenID] == _claims;
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
    
    function _getDogoBreed(uint _tokenID) internal view returns (uint256 _genes,  uint256 _generation) {
        Dogo storage tempDogo = Dogos[_tokenID]; // now tempDogo contains all of Dogos array at index [tokenID] from blockchain storage
        _generation = uint256(tempDogo.generation);
        _genes = uint256(tempDogo.genes);

    }
    
    function createGen0Dogo(uint _genes) public onlyOwner  {
        // passing in genetic code, create the new dogo
        require(gen0Counter < GEN0_LIMIT);
        
        gen0Counter++;
        _createDogo(0,0,0,_genes,msg.sender);
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


    function breed(uint256 _dadID, uint256 _momID) public returns (uint256){
        require(_owns(msg.sender,_dadID) && _owns(msg.sender,_momID)); // confirm both dogos owned by breeder

        // gather mom DNA  (uint256 _genes, uint256 birthTime, uint256 _generation, uint256 _momID, uint256 _dadID, address _owner)
        (uint256 _dadDNA, uint256 _dadGen) = _getDogoBreed(_dadID);        // call internal function and gather dad DNA
        (uint256 _momDNA, uint256 _momGen) = _getDogoBreed(_momID);

        uint256 newDNA = _mixDNA(_dadDNA, _momDNA); // send to blend mixing algo for genetics
        uint256 offspringGen = 0;
        uint256 genDiff = 0;
        if (_dadGen > _momGen){
            genDiff = _dadGen - _momGen;
            offspringGen = (_dadGen++)-(genDiff/2); 
        } else if (_momGen > _dadGen){
            genDiff = _dadGen - _momGen;
            offspringGen = (_dadGen + 1)-(genDiff/2); // half the distance
        } else {
            offspringGen = _dadGen + 1; // simply add to gen
        }
        
        _createDogo(_momID,_dadID, offspringGen, newDNA, msg.sender ); // _createDogo( uint256 _momID, uint256 _dadID, uint256 _generation, uint256 _genes, address _owner) 
    }
   
   
   function _mixDNA(uint256 _dadDNA, uint256 _momDNA ) internal  pure returns(uint256){
       uint256 firstPart = _dadDNA/100000000;
       uint256 secondPart = _momDNA % 100000000;
       
       uint256 newDNA = firstPart * 100000000;
       newDNA = newDNA + secondPart;
       return newDNA;
   }
   
    function transfer(address _to, uint256 _tokenID) external { // transfers the dogo token from msg.sender to new _to address
        require(_to != address(this)); // `to` can not be the contract address.
        require(_to != address(0)); //`to` cannot be the zero address
        require(_owns(msg.sender, _tokenID)); // `tokenId` token must be owned by `msg.sender`.
        _transfer(msg.sender, _to, _tokenID); // call internal transfer to complete - emit performed at internal transfer
    }

    function _transfer(address _from, address _to, uint256 _tokenID) internal {
        // split off transfer for re-use
        dogoIndexToOwner[_tokenID] = _to;   // set array index of dogos to new owner
        ownershipTokenCount[_to] = SafeMath.add(ownershipTokenCount[_to],1); // add to the total new owner count 

        if (_from != address(0)){ // check if there is an actual previous owner then decrease ownership count
            ownershipTokenCount[_from] = SafeMath.sub(ownershipTokenCount[msg.sender],1);  // reduce previous owner's dogo count
            delete dogoIndexToApproved[_tokenID]; // remove ability to approve others since they no longer own the token
        }

        emit Transfer (_from, _to, _tokenID); // announce transfer 

    }



    function approve(address _approved, uint256 _tokenID) external {
        require(_owns(msg.sender, _tokenID)); // require address is the owner - nacho keys nacho token.
        require(_tokenID < Dogos.length); // make sure dogo exists 
        dogoIndexToApproved[_tokenID] = _approved; // add the approved address to the  token ID mapping
        // no need to add operator mapping since owner has rights
        emit Approval(msg.sender, _approved, _tokenID); // call event to log owner sending tokenID to the approved address
        
    }
    
 
    function setApprovalForAll(address _operator, bool _approved) external { // sets approval for all of `msg.sender`'s assets - multiple operators per owner.
      
        require(_operator != msg.sender); 
         _operatorApprovals[msg.sender][_operator] = _approved;

           /// @param _approved True if the operator is approved, false to revoke approval
        emit ApprovalForAll(msg.sender,_operator, _approved);
        
    }


    function getApproved(uint256 _tokenID) external view returns (address){  // getter
        require(_tokenID < Dogos.length); // make sure dogo exists 
        return dogoIndexToApproved[_tokenID]; // @return The approved address for this NFT, or the zero address if there is none
        
    }
    

    function isApprovedForAll(address _owner, address _operator) public view returns (bool) { //getter
        // @notice Query if an address is an authorized operator for another address
        return   _operatorApprovals[_owner][_operator]; // @return True if `_operator` is an approved operator for `_owner`, false otherwise
        
    }
    

    function transferFrom(address _from, address _to, uint256 _tokenID) external{
        require(_tokenID < Dogos.length);  // make sure dogo exists      
        require(_owns(_from , _tokenID));     /// @param _from The current owner of the NFT in case someone sending on behalf of owner cannot use msg.sender
        require(msg.sender == _from || _operatorFor(msg.sender, _tokenID) || isApprovedForAll(_from, msg.sender) ); // either the owner, or specific operator or approved address for all.
        require(_to != address(0));    /// @param _to The new owner - make sure this is not sending to the zero address
        _transfer(_from, _to, _tokenID); // call internal transfer to complete
        
    }    
        
        
    function _checkERC721Support(address _from, address _to, uint256 _tokenID, bytes memory _data) internal returns (bool) {
        // check for contract
        if (!_isContract(_to)){
            // correctly supports ERC721 
                return true;
        }
        
        
        bytes4 returnData =  IERCReceiver (_to).onERC721Received(msg.sender, _from, _tokenID, _data); // calling interface function to get bytes to check if this is a contract that can accommodate ERC721 tokens
        return returnData == SPECIAL_ERC721_RECEIVED;
        
        
    }
        
        

    ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
    ///  `onERC721Received` on `_to` and throws if the return value is not
    ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.

    function safeTransferFrom(address _from, address _to, uint256 _tokenID, bytes memory _data) public {
        require(_owns(_from , _tokenID));     /// @param _from The current owner of the NFT in case someone sending on behalf of owner cannot use msg.sender
        require(msg.sender == _from || _operatorFor(msg.sender, _tokenID) || isApprovedForAll( _from, msg.sender) ); // either the owner, or specific operator or approved address for all.
        require(_tokenID < Dogos.length);  // make sure dogo exists      
        require(_to != address(0));    /// @param _to The new owner - make sure this is not sending to the zero address
        _checkERC721Support(_from, _to, _tokenID, _data);
        _transfer(_from, _to, _tokenID); // call internal transfer to complete
        
    }


    function safeTransferFrom(address _from, address _to, uint256 _tokenID) public {
        safeTransferFrom(_from, _to, _tokenID, "");
        
    }
        
        
    function _isContract (address _to) view internal returns (bool)  {
        // codesize 0 for wallet
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
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
