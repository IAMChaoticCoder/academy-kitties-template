
var parent1 = null;
var parent2 = null;
var selID = null;
function selectDogo(x){
    x.classList.toggle("fas");
    var selID = (x.id);
    if (parent1 == null){// no parent selected
        if (selID !=null){ // selection has been made
            parent1 = selID; // set parent1 to selection
            $('#parent1').html("Selected Parent # " + selID); //update HTML of div for selection
            selID = null;

        }
    } else { // parent 1 not null - check if it is being toggled
        if (parent1 == selID){ // toggle made
            selID = null;
            parent1 = null;
            $('#parent1').html("Pick Parent 1");
        } else { // not the same - this is for parent2 and parent1 has a value
            parent2 = selID;
            $('#parent2').html("Selected Parent # " + selID);
            selID = null;

        }
    }
    if (parent2 == null){// only when parent1 is null as well
        if (selID !=null){ // selection has been made
            parent2 = selID; // set parent2 to selection
            $('#parent2').html("Selected Parent # " + selID); //update HTML of div for selection
            
        }
    } else { // parent 2 not null - check if it is being toggled
        if (parent2 == selID){ // toggle made
            selID = null;
            parent2 = null;
            $('#parent2').html("Pick Parent 2");
        } 
        
    }
  
    if (parent1 !=null && parent2 != null){

        $('#breedmodal').modal('hide');
        $('#breedmodal').modal('show');
        completeBreeding(parent1, parent2);
      //  $(location).attr('href', 'mydogos.html')
    }
    console.log("sel = " + selID);
    console.log("p1 = " + parent1);
    console.log("p2 = " + parent2);
};

$("#breedmodal").on('hide.bs.modal', function(){
    $( "i.tumble" ).toggleClass( "fas" )
    parent1 = null;
    $('#parent1').html("Pick Parent 1");
    parent2 = null;
    $('#parent2').html("Pick Parent 2");

});

async function completeBreeding(parent1, parent2){
    var aDogo; 
    var puppyID;
    try{
        //  function breed(uint256 _dadID, uint256 _momID) public returns (uint256)
            puppyID= await instance.methods.breed(parent1,parent2).call();  // breed  and get new puppy ID
            aDogo= await instance.methods.getDogo(puppyID).call(); // get puppy attributes
            paintPooch(aDogo[0],aDogo[2],puppyID); // paint out the new puppy

        }  
     catch(err){
        console.log(err);
    }
};