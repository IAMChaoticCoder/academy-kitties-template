
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "facecolor" : 13,
    "eyecolor" : 96,
    "earcolor" : 10,
    "tailcolor" : 10,
    //dogotributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnaface').html(defaultDNA.faceColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
  $('#dnatail').html(defaultDNA.tailColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderdogo(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnaface').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnatail').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderdogo(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    faceColor(colors[dna.facecolor],dna.facecolor)
    $('#face').val(dna.facecolor) 
    eyeColor(colors[dna.eyecolor],dna.eyecolor)
    $('#eyes').val(dna.eyecolor)// id of input from dogo Colors
    earColor(colors[dna.earcolor],dna.earcolor)
    $('#ears').val(dna.earcolor)
    tailColor(colors[dna.tailcolor],dna.tailcolor)
    $('#tail').val(dna.tailcolor)

}

// Changing dogo colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#face').change(()=>{
  var colorVal = $('#face').val()
  faceColor(colors[colorVal],colorVal)
})

$('#eyes').change(()=>{
  var colorVal = $('#eyes').val()
  eyeColor(colors[colorVal],colorVal)
})

$('#ears').change(()=>{
  var colorVal = $('#ears').val()
  earColor(colors[colorVal],colorVal)
})

$('#tail').change(()=>{
  var colorVal = $('#tail').val()
  tailColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})


