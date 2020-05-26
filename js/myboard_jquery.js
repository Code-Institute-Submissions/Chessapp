

// access skill level elements:
// default value




$(".skillptions a").click(function () {
    
    skill_level= $(this).text();
    
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
        $(".pieces_bottom i").css({ "color" : "#e4f1f1fb"});
        $(".pieces_top i").css({ "color" : "#101111e3"});    
    
    }else{
        player_colour="b";
        stockfish_colour="w";
        console.log("playercolour:"+player_colour+"stockfishcolour:"+stockfish_colour)
        newgame("black");

        $(".pieces_bottom i").css({ "color" : "#101111e3"});
        $(".pieces_top i").css({ "color" : "#e4f1f1fb"});    

    }


    
});

// jquery for new game :
$("#newgame").click(function(){
    console.log("pressed new button")
            player_colour="w";
        stockfish_colour="b";
         
    newgame("white");

     $(".pieces_bottom i").css({ "color" : "#e4f1f1fb"});
        $(".pieces_top i").css({ "color" : "#101111e3"});    

})


/// Jquery and Js to add captired pieces to keep track : code from https://github.com/jhlywa/chess.js/issues/82


// change user colour if the game is black:

