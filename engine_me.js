//** Adapted Example file fromstockfish js */


// Initiate Game Variables ::
//No clock implemented


var $status = $('#status')
var player_colour="w";
var stockfish_colour="b";
var engineStatus = {};
var Game_over=false;
var stockfish_search_depth="";
var skill_level;
var clicked_colour;
var config = {
  draggable: true,
  position: 'start',
  onDragStart :onDragStart,
  onDrop:onDrop,
  onSnapEnd: onSnapEnd
}


myboard = new ChessBoard('myboard', config);



//** Define  functions tosend  messages and recieve messages as well as statuses from the engine */
const  chess_game =Chess();

 const stockfish_engine=new Worker('stockfish.js');


 function Send_command(cmd) {
        console.log("UCI: " + cmd); // In accordance with engine-interface.txt
        
        (stockfish_engine).postMessage(cmd);
    }

function EngineStatus(event){

    // based on engine output attach correct values to vars

    // what is the current statuse of the engine:
    (engineStatus.engineReady) ? console.log(" Engine-status : Engine is ready ") : console.log("Engine status :Engine not ready") 

}


//** function to parse engine reply to chessjs library */
function parse_move_engine(engine_reply){
   var match = engine_reply.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);

    console.log("parsed move" +match)
            /// Did the AI move?
            if(match) {
                chess_game.move({from: match[1], to: match[2], promotion: match[3]});
                get_move_engine();
            } 

}




function set_search_depth(skill_level){

    // function to search different depth , otherwise takes too long
if(skill_level==="Easy"){
    stockfish_search_depth ="1";
} else if(skill_level==="Medium") {

    stockfish_search_depth="2";
} else if (skill_level==="Hard"){

    stockfish_search_depth="3";
}
return stockfish_search_depth;

}





function get_move_engine(){

    console.log("My skill level"+skill_level)
        stockfish_search_depth=set_search_depth(skill_level);

    myboard.position(chess_game.fen());


console.log("Board"+ myboard.position())
   // console.log(myboard)
    // set current board position using chessboard js library:
//    myboard.position(chess_game.fen());


    // Using Chess.js , 
        var moves = '';
        var game_history = chess_game.history({verbose: true});
        
    // Get the move history and parse it to a string for uci protocol
    (game_history).forEach(s => moves+=' '+s.from+s.to+(s.promotion ? s.promotion : ''));

    console.log(moves)
    


    // Pass this to a the engine:
        // if engines turn and game not over

        if((chess_game.turn()==stockfish_colour) && (!Game_over)){


            console.log("Posting message")

            // post  the message
               Send_command('position startpos moves' + moves);
  
            //  Request analysis from the engine: /search depth set to default
            
              Send_command("go " +"depth "+stockfish_search_depth);

        }
        // Update chess board
        updateStatus();
        gamehistory();

}



// Function to post and evaluate engine messagess




 stockfish_engine.onmessage = function(event) {
      var engine_reply
    
      //  Assign data from the engine if response is an object , else do some other parsing
    (event && typeof event === "object") ? engine_reply = event.data : engine_reply = event;
    
    // What is the resposnse?
    console.log(" Engine responds with : " + engine_reply)
    
    // check multitude of cases  and set corresponding status of engine:

    if(engine_reply == 'uciok') {
                 console.log("engine loading")
            engineStatus.engineLoaded = true;
        } else if(engine_reply == 'readyok') {
            engineStatus.engineReady = true;

             console.log("engine ready")
        } else {   
            
            
            console.log("engine not playing | Has made  a move")
            
            // Functiontto parse engine move and  make the move using chess.js library
                parse_move_engine(engine_reply)

}
// Get the new engine status after this :
EngineStatus();

};



" Define generic functions   to get the chess board ready before  start playing------------------------------------------------"


// Function from chessbaord.js library on when to pick pieces
function onDragStart (source, piece, position, orientation) {
  

  
    // At the start of game: do not pick up pieces if the game is over or the wrong colour
  if (chess_game.game_over() || piece.search(player_colour)){

    return false;

  }


}

// Function from Chessboard.js to  only allow legal moves :


 function onDrop (source, target) {



        // see if the move is legal
        var move = chess_game.move({
            from: source,
            to: target,
            promotion: 'q'
            //Add promotion later
        });

        // illegal move
        if (move === null) return 'snapback';

        get_move_engine();
        updateStatus();
        gamehistory();
        
    };


function updateStatus () {
  var status = ''


  var moveColor = 'White'
  if (chess_game.turn() === 'b') {
    moveColor = 'Black'
  }


  // checkmate?
  if (chess_game.in_checkmate()) {
    status = 'chess_game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (chess_game.in_draw()) {
    status = 'chess_game over, drawn position'
  }

  //stalemate
  else if(chess_game.in_stalemate()){

    status = 'chess_game over, stale mate!!'

  }

  // chess_game still on
 else {
    status = moveColor + ' to move'

    // check?
    if (chess_game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }
  $status.html(status)

console.log("Game status "+status)
}

 
    // Get the updated position if illegal move
    
 function onSnapEnd() {
        myboard.position(chess_game.fen());
  };


// Set the correct colour for player2
updateStatus();


/// Get history of captured pieces :

function gamehistory(){
// Using Chess.js , 
        var moves = '';
        var game_history = chess_game.history({verbose: true});
        
        captured_array=[];
        for(i=0;i<game_history.length;i++){
            
            captured=game_history[i]["captured"] 
            //  Get captured from the dictionary:
            if (captured!= undefined){
                   //get color of the capture:
                   captured_color=game_history[i]["color"]
                   // invert color to get captured color
                   
                    if(captured_color==="w"){
                        captured_color="b"

                    }else{
                        captured_color="w"
                    }

                   captured=captured.toUpperCase();
                   capture=captured_color+captured+".png"
                   capture=capture.replace(/\s/g, '');

                captured_array.push(capture)
                console.log("Captured:"+captured_array)
            }
        }
    

// Add Jquery to append correct pieces to end 
if (captured_array.length>0){


    console.log("captured array >0")

    //** Hack to check if array lenght changes and then append  the newest item */
    // first case empty array add captured :
        if(new_array.length==0){

            new_array.splice(0, 0, captured_array);

            console.log("Iniital array: ",new_array)
                for(i=0;i<captured_array.length;i++){
        console.log("captured array looping")
                img_url="img/chesspieces/wikipedia/"+captured_array[i];
                console.log("IMage url"+img_url)
            $('.pieces').append('<img src=' + img_url + ' class="captured" />');
             
        

    }
        }else{
            if(new_array[0].length!=captured_array.length){

                
                
                 new_array.splice(0, 0, captured_array);  
                 
                 console.log("Changed array from inital"+new_array)
                 console.log("Captured array in changed array "+ captured_array)

                
                img_url="img/chesspieces/wikipedia/"+captured_array[captured_array.length-1];
                console.log("IMage url"+img_url)
                $('.pieces').append('<img src=' + img_url + ' class="captured" />');
             
        

            
        }

    }







    

}




}

            new_array=[];// reset previous stored array

        myboard.destroy();
        myboard = new ChessBoard('myboard', config);
        myboard.orientation(player_colour);
        // reset new game
        //  create a new chess constructor from the chessJs lib
        chess_game.reset();
        Send_command('ucinewgame');
        Send_command('isready');
        engineStatus.engineReady = false;
         engineStatus.search = null;
        EngineStatus(); //Initial call should be not ready 
        get_move_engine();// Initial call , if player "w" => none , else get move for stockfish
        updateStatus();
        //$('.pieces').removeAttr('src')// Remove the src for the captured piecees
        //location.reload();

        gamehistory();



/// Function to start a new game :
    function newgame(player_colour){
         
    // create a new construcotr for the stockfish engine using a webworker:
       
            new_array=[];// reset previous stored array

        myboard.destroy();
        myboard = new ChessBoard('myboard', config);
        myboard.orientation(player_colour);
        // reset new game
        //  create a new chess constructor from the chessJs lib
        chess_game.reset();
        Send_command('ucinewgame');
        Send_command('isready');
        engineStatus.engineReady = false;
         engineStatus.search = null;
        EngineStatus(); //Initial call should be not ready 
        get_move_engine();// Initial call , if player "w" => none , else get move for stockfish
        updateStatus();
        //$('.pieces').removeAttr('src')// Remove the src for the captured piecees
        //location.reload();
        $('.pieces > img').remove();

        gamehistory();

    }


        
//newgame("white");






