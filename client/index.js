
var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xeaf020850102A3aAc458Afb70465A68cb22f0beF";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];

        console.log(instance);


    })
})