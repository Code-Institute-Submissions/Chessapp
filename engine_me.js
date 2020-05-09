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




" Define generic functions   to get the chess board ready before  start playing------------------------------------------------"



// Function from chessbaord.js library on when to pick pieces
function onDragStart (source, piece, position, orientation) {
  

  // test my arrow skills
    const piece_colour_func =(piece_colour) =>(piece_colour=="w")?  /^b/ : /^w/

    // At the start of game: do not pick up pieces if the game is over or the wrong colour
  if (chess_game.game_over() || piece.search(piece_colour_func(piece_colour))!== -1){

    return false;

  }


}

// Function from Chessboard.js to  only allow legal moves :

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  updateStatus()
}


 var onDrop = function(source, target) {
        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: document.getElementById("promote").value // Choose a promotable piece 
        });

        // illegal move
        if (move === null) return 'snapback';

        Get_next_move();
    };

    // Get the updated position if illegal move
    
    var onSnapEnd = function() {
        board.position(game.fen());
    };









var config = {
  draggable: true,
  position: 'start',
  onDragStart :onDragStart,
  onDrop:onDrop,
  onSnapEnd: onSnapEnd
}


myboard = new ChessBoard('myboard', config);

console.log("Board"+ myboard.position())


function moves_by_user(){





}