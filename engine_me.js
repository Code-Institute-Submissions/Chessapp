// Initiate Game Variables ::


var piece_colour="w";




//Initiate engine and Chess js library 


//  create a new chess constructor from the chessJs lib
 const  chess_game =Chess();
 // create a new construcotr for the stockfish engine using a webworker:
 const stockfish_engine=new Worker('stockfish.js');


 // Check if I can post message to the engine and recieve something back :
 var message_engine=stockfish_engine.postMessage('go depth 15');
  console.log("Posting message"+message_engine)
 // get output of the engine message 
 
 stockfish_engine.onmessage = function(event) {
  console.log(event.data);
};




///  Define generic functions  to get  moves played by the user and posting it to engine:



// Function from chessbaord library on when to pick pieces
function onDragStart (source, piece, position, orientation) {
  

  // test my arrow skills
    const piece_colour_func =(piece_colour) =>(piece_colour=="w")?  /^b/ : /^w/

    // At the start of game: do not pick up pieces if the game is over or the wrong colour
  if (chess_game.game_over() || piece.search(piece_colour_func(piece_colour))!== -1){

    return false;

  }


}


 

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}


myboard = new ChessBoard('board', config);



function moves_by_user(){





}