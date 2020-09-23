// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xd3A579C9d6dff22e1457fFE190f235132EE494BF"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;