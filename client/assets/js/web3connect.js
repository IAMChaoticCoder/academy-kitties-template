// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x466825861F537fBA16A31A7a671A6AF3b4521f22"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;