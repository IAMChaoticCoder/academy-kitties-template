
$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];

        console.log(instance);

        instance.events.Birth().on('data', function(event){
            console.log(event);
            let owner = event.returnValues.owner;
            let dogoID = event.returnValues.dogoID;
            let momID = event.returnValues.momID;
            let dadID = event.returnValues.dadID;
            let genes = event.returnValues.genes;
            $("#newDogo").modal("show");
            $("#dogoInfo").html("<li>Owner:" + owner + "</li><li>DogoID: " + dogoID + "</li><li>momID: " + momID + "</li><li>dadID: " + dadID + "</li><li>Genes: " + genes + "</li>");
        })
        .on('error', console.error);

    })
})