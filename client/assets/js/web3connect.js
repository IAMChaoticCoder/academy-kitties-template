// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x26d4783235EaE8EE85ddBC38A0040eB517a6f8C1"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;