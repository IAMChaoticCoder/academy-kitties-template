
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
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the dogo
}

function faceColor(color,code) {
    
    $('.face, .tummy').css('background', '#' + color)  //This changes the color of the dogo face and tummy
    $('#facecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaface').html(code) //This updates the body color part of the DNA that is displayed below the dogo
}

function tailColor(color,code) {
    
    $('.tail').css('border-color', '#' + color)  //This changes the color of the dogo tails since I use only border color
    $('#tailcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnatail').html(code) //This updates the body color part of the DNA that is displayed below the dogo
}


function eyeColor(color,code) {
    $('.pupil').css('border-color', '#' + color)  //This changes the color of the dogo
    $('#eyescode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the dogo
}


function earColor(color,code) {
    $('.ear').css('border-color', '#' + color)  //This changes the color of the dogo
    $('#earscode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the dogo
}



//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
    }
}

async function normalEyes() {
    await $('.eyes').find('span').css('border', 'none')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.dogo__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.dogo__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.dogo__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
