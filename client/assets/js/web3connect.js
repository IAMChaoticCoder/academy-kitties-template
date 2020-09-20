// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x04B2C131a91A8b01642C4dd323aaa302a0Fd195A"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;