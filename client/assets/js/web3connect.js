// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x62Fb4978bFbD39c83f41fF76770c14c8f7eA56Ee"; // update to new contract address on redeploy/remigrate
ethereum.autoRefreshOnNetworkChange = false;