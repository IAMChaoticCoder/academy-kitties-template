// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var marketInstance;
var user;
var contractAddress = "0xfc25D43E91207eAA830201bA424102f6d4BFf0F8"; // update to new contract address on redeploy/remigrate
var marketAddress = "0xfc25D43E91207eAA830201bA424102f6d4BFf0F8";
ethereum.autoRefreshOnNetworkChange = false;