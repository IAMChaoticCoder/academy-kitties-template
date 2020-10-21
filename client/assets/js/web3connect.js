// connection information for all pages

var web3 =  new Web3(Web3.givenProvider);

var instance;
var marketInstance;
var user;
var contractAddress = "0xC8Ad116921CEd4137FA706cdC92513052476d0D5"; // update to new contract address on redeploy/remigrate
var marketAddress = "0x63c9D6798585E36fC59b7F745232D95c0407Be29";
ethereum.autoRefreshOnNetworkChange = false;