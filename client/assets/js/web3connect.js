// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x67e25c0380ebB18b7a41844454F814Bb3E49b887"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;