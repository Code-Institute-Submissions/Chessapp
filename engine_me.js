// Initiate Game Variables ::
//No clock implemented



var player_colour="w";
var engineStatus = {};

//Initiate engine and Chess js library 

//  create a new chess constructor from the chessJs lib
 const  chess_game =Chess();
 // create a new construcotr for the stockfish engine using a webworker:
 const stockfish_engine=new Worker('stockfish.js');

/** 
 // Check if I can post message to the engine and recieve something back :
 var message_engine=stockfish_engine.postMessage("position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1"

);
 var message_engine=stockfish_engine.postMessage("go movetime 15000")

  console.log("Posting message"+message_engine)
 // get output of the engine message 
 

 */


 // Start a game with the engine :

 function Send_command(cmd) {
        console.log("UCI: " + cmd); // In accordance with engine-interface.txt
        
        (stockfish_engine).postMessage(cmd);
    }

function EngineStatus(event){

    // based on engine output attach correct values to vars

    // what is the current statuse of the engine:
    (engineStatus.engineReady) ? console.log(" Engine-status : Engine is ready ") : console.log("Engine status :Engine not ready") 

}

    // Start a new game , display the status of the engine  add a couple of switches to monitor the engine statuses
    Send_command('ucinewgame');
    Send_command('isready');
    engineStatus.engineReady = false;
    engineStatus.search = null;
    EngineStatus(); //Initial call should be not ready 
    Get_next_moves();
    Game_over = false;



 stockfish_engine.onmessage = function(event) {
      var engine_reply
    
      //  Assign data from the engine if response is an object , else do some other parsing
    (event && typeof event === "object") ? engine_reply = event.data : engine_reply = event;
    
    // What is the resposnse?
    console.log(" Engine responds with : " + engine_reply)
    
    // check multitude of cases :

    if(engine_reply == 'uciok') {
                 console.log("engine loading")
            engineStatus.engineLoaded = true;
        } else if(engine_reply == 'readyok') {
            engineStatus.engineReady = true;

             console.log("engine ready")
        } else {   
            
            
            console.log("engine not playing | Has made  a move") 


}
// Get the new engine status after this :
EngineStatus();

};



" Define generic functions   to get the chess board ready before  start playing------------------------------------------------"


// Function from chessbaord.js library on when to pick pieces
function onDragStart (source, piece, position, orientation) {
  

  // test my arrow skills
    const player_colour_func =(player_colour) =>(player_colour=="w")?  /^b/ : /^w/

    // At the start of game: do not pick up pieces if the game is over or the wrong colour
  if (chess_game.game_over() || piece.search(player_colour_func(player_colour))!== -1){

    return false;

  }


}

// Function from Chessboard.js to  only allow legal moves :


 var onDrop = function(source, target) {
        // see if the move is legal
        var move = chess_game.move({
            from: source,
            to: target
            //Add promotion later
        });

        // illegal move
        if (move === null) return 'snapback';

        updateStatus();
    };

/**
 * Get chess move from  game history send it engine
 * get correspoind move from engine
 * make the move on chess baord library  and add to chess history?
 * 
 * 
 * 
 * 
 * 
 */    


// Using function decleartions , so functions is hoisted for  the above  ( use customChessboard js library function)?


function updateStatus () {
  var status = ''

  // get the tuurn and reset player colour
  if (chess_game.turn() === 'b') {
    player_colour = 'b'
  }else{
      player_colour="w"
  }

  // checkmate?
  if (chess_game.in_checkmate()) {
    status = 'chess_game over, ' + player_colour + ' is in checkmate.'
  }

  // draw?
  else if (chess_game.in_draw()) {
    status = 'chess_game over, drawn position'
  }

  // chess_game still on
  else {
    status = player_colour + ' to move'

    // check?
    if (chess_game.in_check()) {
      status += ', ' + player_colour + ' is in check'
    }
  }

}

//------------------------------------------------------- Functions to 

 
    // Get the updated position if illegal move
    
var onSnapEnd = function() {
        myboard.position(chess_game.fen());
  };



var config = {
  draggable: true,
  position: 'start',
  onDragStart :onDragStart,
  onDrop:onDrop,
  onSnapEnd: onSnapEnd
}


myboard = new ChessBoard('myboard', config);

// Set the correct colour for player2
updateStatus();

console.log("Board"+ myboard.position())
