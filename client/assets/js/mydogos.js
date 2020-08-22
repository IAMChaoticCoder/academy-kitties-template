var colors = Object.values(allColors())

function paintPooch(_dnaData,_ID){
    splitDNA(_dnaData)
    buildDiv(_ID)
    renderDogo(dnaData,ID)
    $('#dogoDNA' + ID).html(
        `<div class="card">Dogo Details: ` + _dnaData + `</div>`
    )

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

function renderdogo(dnaData, dogoID){
    headColor(dnaData.headcolor,dogoID)
    faceColor(dnaData.facecolor, dogoID)
    eyeColor(dnaData.eyecolor,dogoID)
    earColor(dnaData.earcolor,dogoID)
    tailColor(dnaData.tailcolor,dogoID)
    decoMidColor(dnaData.decorationMidcolor,dogoID)
    decoSideColor(dnaData.decorationSidescolor,dogoID)
    eyeVariation(dnaData.eyesShape,dogoID);
    decorationVariation(dnaData.decorationPattern,dogoID);
    animationChange(dnaData.animation,dogoID);
}

function headColor(color,dogoID) {
    $('.dogo-head, .dogo-body, .hind-legs, .front-legs, .paw').css('background', '#' + color)  //This changes the color of the dogo
}

function faceColor(color,dogoID) { 
    $('.face, .tummy').css('background', '#' + color)  //This changes the color of the dogo face and tummy
}

function tailColor(color,dogoID) {
    $('.tail').css('border-color', '#' + color)  //This changes the color of the dogo tails since I use only border color
}

function eyeColor(color,dogoID) {
    $('.eye').css('background', '#' + color)  //This changes the color of the dogo
}

function earColor(color,dogoID) {
    $('.ear').css('border-color', '#' + color)  //This changes the color of the dogo
}

function decoMidColor(color,dogoID) {
    $('.deco-mid').css('background', '#' + color)  //This changes middle stripe decoration color
}

function decoSideColor(color,dogoID) {
    $('.deco-side').css('background', '#' + color)  //This changes the color of the dogo
}

function eyeVariation(num, dogoID) {
    console.log(num)
    $('#dnashape').html(num)
    switch (num) {
        case 1:
            resetEyes(dogoID)  
            break
        case 2:
            resetEyes(dogoID)
            $('.eye').css('border-top',  '15px solid black') 
            break
        case 3:
            resetEyes(dogoID)
            $('.eye').css('border-top',  '15px solid black') 
            $('.eye').css('border-bottom',  '10px solid black') 
            $('.eye-catchlight').css('visibility',  'hidden') 

            break
        case 4:
            resetEyes(dogoID)
            $('.right-eye').css('border-top',  '15px solid black') 
            $('.left-eye').css('border-bottom',  '10px solid black') 
        
            break
        case 5:
            resetEyes()
            $('#eyeName').html('Glasses')
            $('.eyewear').css('visibility',  'visible') 
            $('.leftlens').css('background-color', 'transparent ')
            $('.rightlens').css('background-color', 'transparent ')

            break
        case 6:
            resetEyes()
            $('#eyeName').html('Shades')
            $('.eyewear').css('visibility',  'visible') 
            $('.leftlens').css('background-color', 'rgb(34, 34, 34)')
            $('.rightlens').css('background-color', ' rgb(34, 34, 34)')
            break




    }
}
function resetEyes() {
    $('.eye').css('border',  'none') 
    $('.eye-catchlight').css('visibility',  'visible') 
    $('.eyewear').css('visibility',  'hidden') 
}



function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic') // change the name on the badge
            resetDecoration()   //reset to basic function
            break
        case 2:
            $('#decorationName').html('Crossed')
            resetDecoration()
            $('.deco-mid').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" , "left": "90px"})
            $('.deco-left').css({ "transform": "rotate(45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
            $('.deco-right').css({ "transform": "rotate(-45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
            break

        case 3:
            $('#decorationName').html('Eyebrows')
            resetDecoration()
            $('.deco-mid').css({ "transform": "rotate(0deg)", "height": "25px", "width": "30px", "top": "1px", "border-radius": "0 0 50% 50%" , "left": "85px"})
            $('.deco-left').css({ "transform": "rotate(60deg)", "height": "35px", "width": "14px", "top": "20px", "border-radius": "50% 0 50% 50%" , "left": "50px" })
            $('.deco-right').css({ "transform": "rotate(-60deg)", "height": "35px", "width": "14px", "top": "20px", "border-radius": "0 50% 50% 50%" , "left": "135px"  })
            break
    } 
}


async function resetDecoration() {
   
    $('.deco-mid').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%",  "left": "90px" })
    $('.deco-left').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.deco-right').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}


function animationChange(num, ID) {
    switch (num) {
        case 1:
            resetAnimation();
            break
        case 2:
            resetAnimation();
            $('.full-head').addClass("tiltingHead")
            break
        case 3:
            resetAnimation();
            $('.tail').addClass("waggingTail")
            $('.tail').css('top',  '400px') 
            break
        case 4:
            resetAnimation();
            $('.tongue').css('border',  '2px solid red') 
            $('.mouth').css('height',  '20px') 
            $('.tongue').addClass("panting")
            break
    }       
}

function resetAnimation(ID) {
    $('.full-head').removeClass("tiltingHead")
    $('.tail').removeClass("waggingTail")
    $('.tongue').removeClass("panting")
    $('.tongue').css('border',  'none') 
    $('.mouth').css('height',  '0px') 
    $('.tail').css('top',  '250px') 
}
