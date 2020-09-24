// SPDX-License-Identifier: MIT
pragma solidity ^0.5.12;

import "./Dogocontract.sol";
import "./iMarketplace.sol";


contract Marketplace is Ownable, iMarketplace {

    struct Offer {
        uint64 offerDate;
        uint256 price;
        uint256 tokenID;
        address ownerAddress;
        bool active;
    }

    Offer[] Offers; //array of offers

    mapping (uint256 => uint256) public offerTokentoPrice; // mapping for offer to tokenid


    mapping(address => uint256) ownershipTokenCount; // count of dogos belonging to an address
    mapping (uint256 => address) public dogoIndexToApproved; // mapping to authorize trading
    mapping (address => mapping (address => bool)) private _operatorApprovals; // third party permission from owner address to "operator"

    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    /**
    * Set the current DogoContract address and initialize the instance of Dogocontract.
    * Requirement: Only the contract owner can call.
     */
    function setDogoContract(address _DogoContractAddress) external;

    /**
    * Get the details about a offer for _tokenId. Throws an error if there is no active offer for _tokenId.
     */
    function getOffer(uint256 _tokenId) external view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active);
        Offer storage tempOffer = Offers[_tokenID]; 
            offerdate: uint64(now),
            price: uint256(_price), 
            tokenID: uint256(_tokenId),
            owner: uint256( msg.sender),
            active: bool(_active)
    }
    /**
    * Get all tokenId's that are currently for sale. Returns an empty arror if none exist.
     */
    function getAllTokenOnSale() external view  returns(uint256[] memory listOfOffers){
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



    /**
    * Creates a new offer for _tokenId for the price _price.
    * Emits the MarketTransaction event with txType "Create offer"
    * Requirement: Only the owner of _tokenId can create an offer.
    * Requirement: There can only be one active offer for a token at a time.
    * Requirement: Marketplace contract (this) needs to be an approved operator when the offer is created.
     */
    function setOffer(uint256 _price, uint256 _tokenId) external{
        require(_owns(msg.sender,_tokenId)); // confirm dogo owned by to set an offer
          // create offer as struct
        SalesOffer memory _tempOffer = Offer({
            offerdate: uint64(now),
            price: uint256(_price), 
            tokenID: uint256(_tokenId),
            owner: uint256( msg.sender),
            active: bool(_active)
        });
        uint256 newOfferID = Offers.push(_tempDogo) -1; // start first dog index 0
        emit MarketTransaction( "Create offer" ,msg.sender, _tokenId); // announce transaction for owning offer

    }

    /**
    * Removes an existing offer.
    * Emits the MarketTransaction event with txType "Remove offer"
    * Requirement: Only the seller of _tokenId can remove an offer.
     */
    function removeOffer(uint256 _tokenId) external{

        delete currentOffers[_tokenID]; // drop the offer from the currentOffer array
        emit MarketTransaction( "Remove offer" ,msg.sender, _tokenId); // announce transaction for removing offer 
    }
    /**
    * Executes the purchase of _tokenId.
    * Sends the funds to the seller and transfers the token using transferFrom in Dogocontract.
    * Emits the MarketTransaction event with txType "Buy".
    * Requirement: The msg.value needs to equal the price of _tokenId
    * Requirement: There must be an active offer for _tokenId
     */
    function buyDogo(uint256 _tokenId) external payable{
        require(msg.value == price)
        // send funds to seller address

        emit MarketTransaction( "Buy" ,msg.sender, _tokenId); // announce transaction to buy
    }



}
