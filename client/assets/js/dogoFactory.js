
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}



//This function code needs to modified so that it works with Your dogo code.
function headColor(color,code) {
    $('.dogo-head, .dogo-body, .hind-legs, .front-legs, .paw').css('background', '#' + color)  //This changes the color of the dogo
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the color part of the DNA that is displayed below the dogo
}

function faceColor(color,code) {
    
    $('.face, .tummy').css('background', '#' + color)  //This changes the color of the dogo face and tummy
    $('#facecode').html('code: '+code) 
    $('#dnaface').html(code) 
}

function tailColor(color,code) {
    
    $('.tail').css('border-color', '#' + color)  //This changes the color of the dogo tails since I use only border color
    $('#tailcode').html('code: '+code) 
    $('#dnatail').html(code) 
}


function eyeColor(color,code) {
    $('.eye').css('background', '#' + color)  //This changes the color of the dogo
    $('#eyescode').html('code: '+code) 
    $('#dnaeyes').html(code) 
}


function earColor(color,code) {
    $('.ear').css('border-color', '#' + color)  //This changes the color of the dogo
    $('#earscode').html('code: '+code) 
    $('#dnaears').html(code) 
}

function decoMidColor(color,code) {
    $('.deco-mid').css('background', '#' + color)  //This changes middle stripe decoration color
    $('#midcode').html('code: '+code) 
    $('#dnadecorationMid').html(code) 
}

function decoSideColor(color,code) {
    $('.deco-side').css('background', '#' + color)  //This changes the color of the dogo
    $('#sidecode').html('code: '+code) 
    $('#dnadecorationSides').html(code) 
}

function eyeVariation(num) {
    console.log(num)
    $('#dnashape').html(num)
    switch (num) {
        case 1:
            resetEyes()   // reset of eyes
            $('#eyeName').html('Basic') // set the badge to reflect change
            break
        case 2:
            resetEyes()
            $('#eyeName').html('Chill')
            $('.eye').css('border-top',  '15px solid black') 
           // eyesType1()
            break
        case 3:
            resetEyes()
            $('#eyeName').html('Sleepy')
            $('.eye').css('border-top',  '15px solid black') 
            $('.eye').css('border-bottom',  '10px solid black') 
            $('.eye-catchlight').css('visibility',  'hidden') 

            break
        case 4:
            resetEyes()
            $('#eyeName').html('Trippin')
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


function animationChange(num) {

    $('#dnaanimation').html(num)
    switch (num) {
        case 1:
            resetAnimation();
            $('#animationName').html('No Animation')
            // no animation
            break
        case 2:
            resetAnimation();
            $('#animationName').html('Tilting Head')
            $('.full-head').addClass("tiltingHead")
            break
        case 3:
            resetAnimation();
            $('#animationName').html('Wagging Tail')
            $('.tail').addClass("waggingTail")
            $('.tail').css('top',  '400px') 
            break
        case 4:
            resetAnimation();
            $('#animationName').html('Panting')
            $('.tongue').css('border',  '2px solid red') 
            $('.mouth').css('height',  '20px') 
            $('.tongue').addClass("panting")
            break


    }
       
}

function resetAnimation() {
    $('.full-head').removeClass("tiltingHead")
    $('.tail').removeClass("waggingTail")
    $('.tongue').removeClass("panting")
    $('.tongue').css('border',  'none') 
    $('.mouth').css('height',  '0px') 
    $('.tail').css('top',  '250px') 
}
