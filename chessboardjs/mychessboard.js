
/**  ------------------------------------------------------------------------ Initial Board config using Chessboard js */
// Use Library Default to make draggable

var config = {
  draggable: true,
  dropOffBoard: 'snapback', // this is the default
  position: 'start'
}



// Initial empty chess board with  pieces 

var board1 = ChessBoard('board1', config);




//---------------------------------------------------------Functions from chessbaord-js to play and generate fen positions------------------------------------------------------------------------

// Generate board  and fen positions

function clickShowPositionBtn(){

console.log("Current Position as an object:")
console.log(board1.position());


console.log("Current Position as an object:");
console.log(board1.fen());


}

$('#board1').on('click',clickShowPositionBtn)










