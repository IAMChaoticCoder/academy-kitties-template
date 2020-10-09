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

    mapping (uint256 => Offer) public tokenToOffer; // mapping for offer to tokenid


    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    function setDogoContract(address _DogoContractAddress) external onlyOwner{ //Only the contract owner can call.
        _dogoContract = DogoContract(_DogoContractAddress);// Set the current DogoContract address and initialize the instance of Dogocontract.
    }
    
    constructor(address _DogoContractAddress) public {
        setDogoContract(_DogoContractAddress);
    }

    function getOffer(uint256 _tokenId) external view returns ( uint64 offerdate, address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        Offer storage tempOffer = Offers[_tokenID]; 
           /*
            offerdate = uint64(tempOffer.offerdate);
            price = uint256(tempOffer.price), 
            tokenID = uint256(tempOffer.tokenID),
            owner = uint256(tempOffer.ownerAddress),
            active = bool(tempOffer.active)
            */
            return(tempOffer.offerdate,tempOffer.seller, tempOffer.price, tempOffer.index, tempOffer.tokenId, tempOffer.active);
    }

    function getAllTokenOnSale() external view  returns(uint256[] memory listOfOffers){
        uint ownedIndex = 0; // index for owned array
        uint[] memory allOffers = Offers.length; 
        
        // check for no Offers
        if (allOffers ==0) {
            return uint256[](0);
        } else {
            for (uint i = 0; i < Offers.length; i++){
                if (Offers(i) == _address) {
                    ownedArray[ownedIndex] = i;
                    ownedIndex++;
                }
            }
            return ownedArray;
        }
    }

    function setOffer(uint256 _price, uint256 _tokenId) external{
        require(_owns(msg.sender,_tokenId)); // confirm dogo owned by to set an offer
        //    There can only be one active offer for a token at a time.
        // ??Marketplace contract (this) needs to be an approved operator when the offer is created.
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


    function removeOffer(uint256 _tokenId) external{
        require(_owns(msg.sender,_tokenId)); // Only the seller of _tokenId can remove an offer.
        delete currentOffers[_tokenID]; // drop the offer from the currentOffer array
        emit MarketTransaction( "Remove offer" ,msg.sender, _tokenId); // announce transaction for removing offer 
    }


    function buyDogo(uint256 _tokenId) external payable{
        require(msg.value == price); //The msg.value needs to equal the price of _tokenId
        require(active offer for token ) // There must be an active offer for _tokenId
        // Sends the funds to the seller and transfers the token using transferFrom in Dogocontract.

        emit MarketTransaction( "Buy" ,msg.sender, _tokenId); // announce transaction to buy
    }



}
