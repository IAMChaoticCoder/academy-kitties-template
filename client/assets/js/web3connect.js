// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x4466b9b9Eb38dAAe92162062783cA329AAB4236a"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;