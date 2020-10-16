// Marketplace


var colors = Object.values(allColors())

function paintPooch(_dnaData, _gen, _ID){

    console.log("1) Extracting DNA.....");
    let customDNA = splitDNA(_dnaData)
    console.log("2) Creating Kennel Div....");
    buildDiv(_ID)
    renderDogo(customDNA,_ID)
    $('#dnaTag' + _ID).html(_dnaData)
    $('#genTag' + _ID).html(_gen )
    $('#dnaspecialTag' + _ID).html("N/A")

}



function buildDiv(_ID){
// build individual div for the dogo then apply specific attributes
//Small ≥576px	Medium ≥768px	Large ≥992px	Extra large ≥1200px
    var dogoDiv = `<div class="col-xl-3  col-md-5 col-sm-10 dogoBox m-3" id="dID` + _ID + `"> <!-- see dogo.css-->
   
    <div class="dogo   ">
    <div id="breedselect` + _ID + `" class="breedTag"><i  onclick="selectDogo(this)" class="far fa-heart" id="` + _ID + `" title="Select to match and breed"></i></div>
 
     
        <div class="tail"  id="tail` + _ID + `"></div> <!-- add waggingTail for animation-->
        <div class="undershadow"></div>
        <div class="dogo-body" id="dogo-body` + _ID + `">

            <div class="tummy" id="tummy` + _ID + `"></div>
        </div>
        <div class="full-head " id="full-head` + _ID + `"> <!-- add tiltingHead for animation-->
            <div class="ears">
                <div class="ear left-ear" id="left-ear` + _ID + `">
                    <div class="inner-ear"></div>
                </div>
                <div class="ear right-ear" id="right-ear` + _ID + `">
                    <div class="inner-ear"></div>
                </div>
            </div>
            <div class="dogo-head" id="dogo-head` + _ID + `">
                <div class="deco-left deco-side" id="deco-left` + _ID + `"></div>
                <div class="deco-mid" id="deco-mid` + _ID + `"></div>
                <div class="deco-right deco-side"  id="deco-right` + _ID + `"></div>
                
                
                <div class="eyes" id="eyes` + _ID + `">
                    <div class="eye left-eye" id="left-eye` + _ID + `">
                        <div class="eye-catchlight"> </div>
                    </div>
                    <div class="eye right-eye" id="right-eye` + _ID + `">
                        <div class="eye-catchlight"> </div>
                    </div>
                </div>


                <div class="face">
                    <div class="nose">
                        <div class="nostril"></div>
                        <div class="nostril"></div>
                    </div>

                    <div class="mouth"> </div>
                    <div class="tongue "  id="tongue` + _ID + `"></div><!-- add panting for animation-->
                </div>
                                
                <div class="eyewear"  id="eyewear` + _ID + `">
                    <div class="leftlens"  id="leftlens` + _ID + `"></div>
                    <div class="rightlens"  id="rightlens` + _ID + `"></div>
                </div>

            </div>
        </div> <!-- full head div -->


        <div class="legs">
            <div class="hind-legs leg-hl"  id="leg-hl` + _ID + `"><div class="paw pr"  id="paw-hl` + _ID + `"></div></div>
            <div class="hind-legs leg-hr" id="leg-hr` + _ID + `"><div class="paw pr"  id="paw-hr` + _ID + `"></div></div>
            <div class="front-legs leg-fl" id="leg-fl` + _ID + `"><div class="paw pf"  id="paw-fl` + _ID + `"></div></div>
            <div class="front-legs leg-fr" id="leg-fr` + _ID + `"><div class="paw pf"  id="paw-fr` + _ID + `"></div></div>
        </div>




    </div> <!-- full dogo-->
    <div class="dnaDiv text-left  p-2  bg-white rounded dnaImg" id="dogoDNA` + _ID + `">
            
        GEN: <span class="bg-light pl-2 pr-2 rounded" id="genTag` + _ID + `"></span><br/>
        DNA: <span class="bg-light pl-2 pr-2  rounded"id="dnaTag` + _ID + `"></span><br/>
        Eyes: <span class="bg-light pl-2 pr-2 rounded" id="eyeTag` + _ID + `"></span> Markings: <span class="bg-light pl-2 pr-2 rounded" id="decoTag` + _ID + `"></span><br>
        Animation: <span class="bg-light pl-2 pr-2 rounded" id="aniTag` + _ID + `"></span> <br/>
        Special:  <span class="bg-light pl-2 pr-2 rounded" id="dnaspecialTag` + _ID + `"></span>

    </div>


</div>`

$('#dogosDisplay').append(dogoDiv)

}


function splitDNA(_dnaData){
    // use substr to split out dna info
    var dnaData = {
        "headcolor" : colors[_dnaData.substr(0,2)] , // head and body
        "facecolor" :  colors[ _dnaData.substr(2,2)], //face and tummy
        "eyecolor" :   colors[_dnaData.substr(4,2)] , // eyes
        "earcolor" :   colors[_dnaData.substr(6,2)], //ears
        "tailcolor" :   colors[_dnaData.substr(8,2)] , // tail
        "eyesShape" :  _dnaData.substr(10,1), // shape  
        "decorationPattern" :   _dnaData.substr(11,1), // head pattern
        "decorationMidcolor" :   colors[_dnaData.substr(12,2)],  // mid color
        "decorationSidescolor" :   colors[_dnaData.substr(14,2)], // side color
        "animation" :   _dnaData.substr(16,1), // animation
        "lastNum" :   _dnaData.substr(17,1) // mutation x-men
    }
    return dnaData
}

function renderDogo(dnaData, dogoID){
    console.log("3) PaintingPooch -Render: " + dnaData + " #" + dogoID )
    headColor(dnaData.headcolor,dogoID)
    faceColor(dnaData.facecolor, dogoID)
    eyeColor(dnaData.eyecolor,dogoID)
    earColor(dnaData.earcolor,dogoID)
    tailColor(dnaData.tailcolor,dogoID)
    decoMidColor(dnaData.decorationMidcolor,dogoID)
    decoSideColor(dnaData.decorationSidescolor,dogoID)
    eyeVariation(parseInt(dnaData.eyesShape),dogoID);
    decorationVariation(parseInt(dnaData.decorationPattern),dogoID);
    animationChange(dnaData.animation,dogoID);
    // mutation(dnaData.lastNum,dogoID); // waiting for dna section
}

function headColor(color,dogoID) {
    $('#dogo-head' + dogoID + ', #dogo-body' + dogoID + ', #leg-fr' + dogoID + ', #leg-fl' + dogoID + ', #leg-hr' + dogoID + ', #leg-hl' + dogoID + ', #paw-fr' + dogoID +  ', #paw-fl' + dogoID + ', #paw-hl' + dogoID + ', #paw-hr' + dogoID ).css('background', '#' + color)  //This changes the color of the dogo
}

function faceColor(color,dogoID) { 
    $('#face' + dogoID + ', #tummy' + dogoID).css('background', '#' + color)  //This changes the color of the dogo face and tummy
}

function tailColor(color,dogoID) {
    $('#tail' + dogoID ).css('border-color', '#' + color)  //This changes the color of the dogo tails since I use only border color
}

function eyeColor(color,dogoID) {
    $('#left-eye' + dogoID + ', #right-eye' + dogoID  ).css('background', '#' + color)  //This changes the color of the dogo
}

function earColor(color,dogoID) {
    $('#left-ear' + dogoID + ', #right-ear' + dogoID).css('border-color', '#' + color)  //This changes the color of the dogo
}

function decoMidColor(color,dogoID) {
    $('#deco-mid' + dogoID ).css('background', '#' + color)  //This changes middle stripe decoration color
}

function decoSideColor(color,dogoID) {
    $('#deco-left' + dogoID + ', #deco-right' + dogoID ).css('background', '#' + color)  //This changes the color of the dogo
}

function eyeVariation(num, dogoID) {

    switch ((num)) {
        case 1:
            resetEyes(dogoID)
            $('#eyeTag' + dogoID).html("Awake") 
            break
        case 2:
            resetEyes(dogoID) //chill
            $('#eyeTag' + dogoID).html("Chill") 
            $('#left-eye' + dogoID + ', #right-eye' + dogoID ).css('border-top',  '15px solid black') 
            break
        case 3:
            resetEyes(dogoID) //sleepy
            $('#eyeTag' + dogoID).html("Sleepy") 
            $('#left-eye' + dogoID + ', #right-eye' + dogoID  ).css('border-top',  '15px solid black') 
            $('#left-eye' + dogoID + ', #right-eye' + dogoID  ).css('border-bottom',  '10px solid black') 
            $('#eye-catchlight' + dogoID ).css('visibility',  'hidden') 

            break
        case 4:
            resetEyes(dogoID) //trippin
            $('#eyeTag' + dogoID).html("Trippin'") 
            $('#right-eye' + dogoID ).css('border-top',  '15px solid black') 
            $('#left-eye' + dogoID ).css('border-bottom',  '10px solid black') 
        
            break
        case 5:
            resetEyes(dogoID) // glasses
            $('#eyeTag' + dogoID).html("Glasses") 
            $('#eyewear' + dogoID ).css('visibility',  'visible') 
            $('#leftlens' + dogoID ).css('background-color', 'transparent ')
            $('#rightlens' + dogoID ).css('background-color', 'transparent ')

            break
        case 6:
            resetEyes(dogoID) //sunglasses
            $('#eyeTag' + dogoID).html("Sunglasses") 
            $('#eyewear' + dogoID ).css('visibility',  'visible') 
            $('#leftlens' + dogoID ).css('background-color', 'rgb(34, 34, 34)')
            $('#rightlens' + dogoID ).css('background-color', ' rgb(34, 34, 34)')
            break

    }
}
function resetEyes(dogoID) {
    $('#left-eye' + dogoID + ', #right-eye' + dogoID ).css('border',  'none') 
    $('#eye-catchlight' + dogoID ).css('visibility',  'visible') 
    $('#eyewear' + dogoID ).css('visibility',  'hidden') 
}



function decorationVariation(num,dogoID) {
    
    switch (num) {
        case 1:
            resetDecoration(dogoID)   //reset to basic function
            $('#decoTag' + dogoID).html("Basic")
            break
        case 2:
            
            resetDecoration(dogoID)
            $('#decoTag' + dogoID).html("Crossed")
            $('#deco-mid' + dogoID).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" , "left": "90px"})
            $('#deco-left' + dogoID).css({ "transform": "rotate(45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
            $('#deco-right' + dogoID).css({ "transform": "rotate(-45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
            break

        case 3:
            
            resetDecoration(dogoID)
            $('#decoTag' + dogoID).html("Eyebrows")
            $('#deco-mid' + dogoID).css({ "transform": "rotate(0deg)", "height": "25px", "width": "30px", "top": "1px", "border-radius": "0 0 50% 50%" , "left": "85px"})
            $('#deco-left' + dogoID).css({ "transform": "rotate(60deg)", "height": "35px", "width": "14px", "top": "20px", "border-radius": "50% 0 50% 50%" , "left": "50px" })
            $('#deco-right' + dogoID).css({ "transform": "rotate(-60deg)", "height": "35px", "width": "14px", "top": "20px", "border-radius": "0 50% 50% 50%" , "left": "135px"  })
            break
    } 
}


async function  resetDecoration(dogoID) {
    
    $('#deco-mid' + dogoID).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%",  "left": "90px" })
    $('#deco-left' + dogoID).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('#deco-right' + dogoID).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}


function animationChange(num, ID) {
    //console.log("animation type: " + num);
    switch (parseInt(num)) {
        case 1:
            resetAnimation();
            $('#aniTag' + ID).html("None")
            break
        case 2:
            resetAnimation();
            $('#aniTag' + ID).html("Tilting")
            $('#full-head'+ ID).addClass("tiltingHead")
            break
        case 3:
            resetAnimation();
            $('#aniTag' + ID).html("Wagging")
            $('#tail'+ ID).addClass("waggingTail")
            $('#tail'+ ID).css('top',  '400px') 
            break
        case 4:
            resetAnimation();
            $('#aniTag' + ID).html("Panting")
            $('#tongue'+ ID).css('border',  '2px solid red') 
            $('#mouth'+ ID).css('height',  '20px') 
            $('#tongue'+ ID).addClass("panting")
            break
    }       
}

function resetAnimation(ID) {
    $('#full-head'+ ID).removeClass("tiltingHead")
    $('#tail'+ ID).removeClass("waggingTail")
    $('#tongue'+ ID).removeClass("panting")
    $('#tongue'+ ID).css('border',  'none') 
    $('#mouth'+ ID).css('height',  '0px') 
    $('#tail'+ ID).css('top',  '250px') 
}


async function getDogos(){
    // pull array of indexes for Dogos owned by the user
    // need to catch errors - uncaught promise - undefined methods
    var aDogo;
    
    try{
        let ownedArray = await instance.methods.allOwned(user).call(); 
        //console.log("***** Gather all of the Dogos *******");
        for (i=0; i < ownedArray.length; i++){ // loop through owned dogo index and call the getDogo to pull attributes
            console.log("**Pulling " + i + " out of " + ownedArray.length + " dogos." );
            aDogo= await instance.methods.getDogo(ownedArray[i]).call(); // paintPooch- aDogo[0],i console.log (aDogo[0]); 
            console.log(aDogo);
            paintPooch(aDogo[0],aDogo[2],i);

        }  
    } catch(err){
        console.log(err);
    }  
}

async function getDogoOffers(){
    var arrayID = await marketInstance.methods.getAllTokenOnSale().call();
    for(i = 0; i < arrayID.length; i++){
        if(arrayID[i] !=0){
            // offers exist
            appendDogo(arrayID[i])
        }
    }
}

$(document).ready(function(){

    console.log("***** Web3 connecting to contract *******");
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        marketInstance = new web3.eth.Contract(marketABI, marketAddress, {from:accounts[0]})
        user = accounts[0];

        console.log(instance);
        getDogos();

        

    })


    
})
