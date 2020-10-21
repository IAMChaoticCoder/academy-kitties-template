// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var marketInstance;
var user;
var contractAddress = "0xCa43EAB2546334d4DEEDefA5641Abc5D246B2F8b"; // update to new contract address on redeploy/remigrate
var marketAddress = "0xCa43EAB2546334d4DEEDefA5641Abc5D246B2F8b";
ethereum.autoRefreshOnNetworkChange = false;