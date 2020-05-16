

// access skill level elements:
// default value

$('#skilllevel').on('change', function () {
    
    skill_level= this.value;
    
    console.log("skill level changed:"+skill_level)

});
(skill_level==undefined)? skill_level="Easy" : skill_level ;




// Add jquery to get player colour  and reassign stockfish colour:
$(".colouroptions a").click( function() {
    var clicked_colour = $(this).text();
    console.log("player colour:"+player_colour +"Stockfish colour: "+stockfish_colour)
    if (clicked_colour==="White"){
        console.log(clicked_colour)
        player_colour="w";
        stockfish_colour="b";
        console.log("playercolour:"+player_colour+"stockfishcolour:"+stockfish_colour)

        newgame();
    
    }else{
        player_colour="b";
        stockfish_colour="w";
        console.log("playercolour:"+player_colour+"stockfishcolour:"+stockfish_colour)
        newgame("black");
    }


    
});

// jquery for new game :
$("#newgame").click(function(){
    console.log("pressed new button")

    newgame("white");

})


/// Jquery to add promotion 
