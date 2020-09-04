// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xB84df611DCE0c6B10B50b91B58857e4515994AEd"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;