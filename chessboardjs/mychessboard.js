
/**  ------------------------------------------------------------------------ Initial Board config using Chessboard js */
// Use Library Default to make draggable

var config = {
  draggable: true,
  dropOffBoard: 'snapback', // this is the default
  position: 'start'
}



// Initial empty chess board with  pieces 

var board1 = ChessBoard('board1', config);


/** CHess Board representation ( different from UI representation)for move validations --------------------------------------------------------------------------------------------------------------
 *
 * 
 *  Rook=2,Knight=3,Bishop=4,Queen=5, King=6 , Pawn =1 , Empty =0 , Off board indices =7---> White Pieces 
 *  White Peices *(-1) -------> Black  
 * https://www.chessprogramming.org/10x12_Board  -below board represnetation by 
 * 
                                                     8   2 3 4 5 6 4 3 2  ->( multiply -1)
                                                     7   1 1 1 1 1 1 1 1  ->( multiply -1)
                                                     6   0 0 0 0 0 0 0 0
                                                     5   0 0 0 0 0 0 0 0
                                                     4   0 0 0 0 0 0 0 0
                                                     3   0 0 0 0 0 0 0 0
                                                     2   1 1 1 1 1 1 1 1
                                                     1   2 3 4 5 6 4 3 2
                                                         a b c d e f g h 
 * 
  For position on the chess board : Set a 8*8+8*2+10*4 array (https://en.wikipedia.org/wiki/Board_representation_(computer_chess) ) -> 1st position a1 = 0 , b1=1 ,c1 =2............h8=63
 
    Possible MOVes -----------
  -- Edge cases:  ( queen , bishops ,rooks ) move in line --   a2 position -> next position  a2 -> iterate array  wrap around --> padding chess board with using a 120 array 
  -- 

 
 */

 // Mapping Chessboard JS notation to th enotation 

var pieces ={ empty : 0 , wR : 2 , wN: 3, wB : 4 , wQ :5 , wK :6 , bR: -2, bN :-3 , bB:-4, bQ:-5, bK:-6 ,wP:1, bP:-1 }

// Define files , ranks : combined to form board positions :

var files={
    File_A:0, File_B:1,File_C:2,File_D:3 , File_E:4, File_F:5,FIle_G:6, File_7:6,File_8:7}


var  Ranks={ Rank_1:0 , Rank_2:1,Rank_3:2, Rank_4:3,Rank_5:4, Rank_6:5,Rank_7:6,Rank_8:7
}



var ranks =[1,2,3,4,6,7,8];

var pawn_conversion_positions={
    A1:21,B1:22,C1:23,D1:24,E1:25,F1:26,G1:27,H1:28,
    A8:91,B8:92,C8:93,D8:94,E8:95,F8:96,G8:97,H8:98,
    No_SQ=99,OFF_board=100


}  

var colours={ White:1,Back:-1}

// Map files and Ranks to Board position indexes 

        









//---------------------------------------------------------Functions from chessbaord-js to play and generate fen positions------------------------------------------------------------------------

// Generate board  and fen positions

function clickShowPositionBtn(){

console.log("Current Position as an object:")
console.log(board1.position());


console.log("Current Position as an object:");
console.log(board1.fen());


}

$('#board1').on('click',clickShowPositionBtn)















//** ------------------------------- Functions or classes to generate  after analaysis from the chess engine---------------------- */
















/** Board representation  - keep track of the board ----------------------*/





class Checkmate{
// Workout if the check mate 



};



class  is_check{
// is the piece under check.


}


/** Legal Valid moves */

// Two ways to describe moves  in chess : Descriptive and Algeabric




class Piecemoves{
// Class to work out possible moves for each chess -pawn move 1 forawrd , knight L etc



};


/** PGN Parser for chess board can interpret */





/*** Parse moves from computer  (which engine ?)--- Check if this is possible */
