
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
  // set DNA text div to default values
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
  // get DNA values showing in DNA string and add to dna variable
    var dna = ''
    dna += $('#dnabody').html() //2
    dna += $('#dnaface').html() //2
    dna += $('#dnaeyes').html() //2
    dna += $('#dnaears').html() //2
    dna += $('#dnatail').html() //2
    dna += $('#dnashape').html() //1
    dna += $('#dnadecoration').html()//1
    dna += $('#dnadecorationMid').html() //2
    dna += $('#dnadecorationSides').html() //2
    dna += $('#dnaanimation').html() //1
    dna += $('#ddnaspecial').html() //1

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
    decoMidColor(colors[dna.decorationMidcolor],dna.decorationMidcolor)
    $('#decoMid').val(dna.decorationMidcolor)
    decoSideColor(colors[dna.decorationSidescolor],dna.decorationSidescolor)
    $('#decoSide').val(dna.decorationSidescolor)

    eyeVariation(dna.eyesShape);
    $("#eyeshape").val(dna.eyesShape);
    
    decorationVariation(dna.decorationPattern);
    $("#decoShape").val(dna.decorationPattern);

    animationChange(dna.animation);
    $("#animation").val(dna.animation);

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

$('#decoMid').change(()=>{
  var colorVal = $('#decoMid').val()
  decoMidColor(colors[colorVal],colorVal)
})

$('#decoSide').change(()=>{
  var colorVal = $('#decoSide').val()
  decoSideColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})


$('#decoShape').change(()=>{
  var shape = parseInt($('#decoShape').val())
  decorationVariation(shape)
})


$('#animation').change(()=>{
  var animationNum = parseInt($('#animation').val())
  animationChange(animationNum)
})

$( "#random" ).click(function() {
  // create random dogo
  var randomDNA = {
    "headcolor" : Math.floor(Math.random() * 89) + 10 ,
    "facecolor" : Math.floor(Math.random() * 89) + 10 ,
    "eyecolor" : Math.floor(Math.random() * 89) + 10 ,
    "earcolor" : Math.floor(Math.random() * 89) + 10 ,
    "tailcolor" : Math.floor(Math.random() * 89) + 10 ,
    //dogotributes
    "eyesShape" : Math.floor(Math.random() * 7) + 1,
    "decorationPattern" :  Math.floor(Math.random() * 2) + 1,
    "decorationMidcolor" : Math.floor(Math.random() * 89) + 10 ,
    "decorationSidescolor" : Math.floor(Math.random() * 89) + 10,
    "animation" :  Math.floor(Math.random() * 4) + 1 ,
    "lastNum" :  Math.floor(Math.random() * 4) + 1 
    }

  renderdogo(randomDNA)


});

$( "#reset" ).click(function() {
  //  reset dogo
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

$( "#save" ).click(function() {
  // save dogo
    var tempDNA = getDna();
    instance.methods.createGen0Dogo(tempDNA).send({}, function(error, txHash){
      if(error)
          console.log(err);
      else{
          console.log(txHash);
      }

  })

});
