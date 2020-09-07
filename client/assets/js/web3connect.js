// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x81c0A03B148B37A3824a3e2343A3f8D269906210"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;