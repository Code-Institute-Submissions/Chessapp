

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
 console.log("Engine output" +message_engine)