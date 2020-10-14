// SPDX-License-Identifier: MIT
pragma solidity ^0.5.12;

import "./Dogocontract.sol";


contract Marketplace is Ownable {
    Dogocontract private _dogoContract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] OffersArr; //array of OffersArr

    mapping (uint256 => Offer) public tokenToOffer; // mapping for offer to tokenid


    event MarketTransaction(string TxType, address owner, uint256 tokenId);



    function setDogoContract(address _DogoContractAddress) public onlyOwner{ //Only the contract owner can call.
        _dogoContract = Dogocontract(_DogoContractAddress);// Set the current DogoContract address and initialize the instance of Dogocontract.
    }
    
    constructor(address _DogoContractAddress) public {
        setDogoContract(_DogoContractAddress);
    }

    function _ownsDogo(address _address, uint256 _tokenId) internal view returns(bool){
        return (_dogoContract.ownerOf(_tokenId) == _address);
    }
    
    function getOffer(uint256 _tokenId) public view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        Offer storage tempOffer = OffersArr[_tokenId]; 
           /*
            offerdate = uint64(tempOffer.offerdate);
            price = uint256(tempOffer.price), 
            tokenID = uint256(tempOffer.tokenID),
            owner = uint256(tempOffer.ownerAddress),
            active = bool(tempOffer.active)
            */
            return(tempOffer.seller, tempOffer.price, tempOffer.index, tempOffer.tokenId, tempOffer.active);
    }

    function getAllTokenOnSale() public view  returns(uint256[] memory listOfOffersArr){
       // uint256 ownedIndex = 0; // index for owned array
        uint256 ttlOffers = OffersArr.length; 
        
        // check for no OffersArr
        if (ttlOffers == 0) {
            return new uint256[](0);
        } else {
            
            uint256[] memory allOffersArr = new uint256[](ttlOffers);
            
            for (uint i = 0; i < ttlOffers; i++){ // index of offers
                if (OffersArr[i].active == true) { // active offer found - get the tokenId
                    allOffersArr[i] = OffersArr[i].tokenId; // append found tokenid to array
                    
                }
            }
            return allOffersArr;
        }
    }

    function setOffer(uint256 _price, uint256 _tokenId) external {
        require(_dogoContract.ownerOf(_tokenId) == msg.sender); // confirm dogo owned by to set an offer
        require(tokenToOffer[_tokenId].active == false); //    There can only be one active offer for a token at a time.
        require(_dogoContract.isApprovedForAll(msg.sender, address(this))); // Marketplace contract (this) needs to be an approved operator when the offer is created.
          // set offer struct
        Offer memory _tempOffer = Offer({
            seller: address( msg.sender),
            price: uint256(_price), 
            index: OffersArr.length,
            tokenId: uint256(_tokenId),
            active: true
            

        });
        
        tokenToOffer[_tokenId] = _tempOffer; // add the tempoffer to the mapping
        OffersArr.push(_tempOffer); // add to the array of OffersArr - start first dog index 0
        emit MarketTransaction( "Create offer" ,msg.sender, _tokenId); // announce transaction for owning offer

    }


    function removeOffer(uint256 _tokenId) public {
        Offer memory offer = tokenToOffer[_tokenId];
        require(offer.seller == (msg.sender)); // Only the seller of _tokenId can remove an offer.

        delete tokenToOffer[_tokenId]; // drop the offer from the currentOffer array
        OffersArr[tokenToOffer[_tokenId].index].active = false; // remove the selected offer
        emit MarketTransaction( "Remove offer" ,msg.sender, _tokenId); // announce transaction for removing offer 
    }


    function buyDogo(uint256 _tokenId) public payable{
        Offer memory offer = tokenToOffer[_tokenId];
        require(msg.value == offer.price); //The msg.value needs to equal the price of _tokenId
        require(tokenToOffer[_tokenId].active == true ); // There must be an active offer for _tokenId
        // Sends the funds to the seller and transfers the token using transferFrom in Dogocontract.
        delete tokenToOffer[_tokenId]; // remove the offer from the currentOffer array as accepted
        OffersArr[tokenToOffer[_tokenId].index].active = false; // remove the selected offer
        
        if (offer.price > 0){
            offer.seller.transfer(offer.price);
        }
        
        _dogoContract.transferFrom(offer.seller, msg.sender, _tokenId);
        emit MarketTransaction( "Buy" ,msg.sender, _tokenId); // announce transaction to buy
    }



}
