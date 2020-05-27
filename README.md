> ![](https://github.com/rbnphlp/Chessapp/blob/master/img/stockfish/Chess_responsiveness.png)	
# Play against Stockfish on your browser 


The project is an attempt to play Chess against a Chess-engine on the browser.Built on top of [Chess.js](https://github.com/jhlywa/chess.js)
(Rules for Chess),[chessboard.js](https://chessboardjs.com/)(chessboard :css+html+jquery) 
and [Stockfish.js](https://github.com/nmrugg/stockfish.js)(Chess engine).Along with sending commands according to the UCI Chess protocol, and parsing Stockfish responses , the game is then glued together with chess.js for legalities and rules , and chess board.js for UI
.

## UX Design 

+ The Skeleton Layout:


    - A Header : Contains the chess engine logo(stockfish) and link to highlight rankings 
    - Nav bar with interatcivty : A  Navbar for allowing users to start a new game , switch sides and choose difficulties
    - The main body which contains chessboard 

Initial wireframe used for developing a prototype ,which was later discarded due to time restrictions:

> ![](https://github.com/rbnphlp/Chessapp/blob/master/img/stockfish/Initialwireframe_chess.png)	

    

## User Stories

> "*I can play a quick game on my browser against an awesome engine -no sign up , no login required* "

> "*It is impressive , how quickly stockfish is possible to play such quick and good moves -awesome responsiveness* "

> "*I am an avid-chess fan , awesome idea , would be good to evaluate specific positions or lines youre intrested in*"


## Design 

To highlight Black and White Chess pieces used light colours throughout with large font weights

+ Features Added: 
    - Allow Users to See Captured pieces 
    - Switch Sides
    - Buttons to start new games.
    - Choose difficulty settings , by changing depth search settings for stockfish
    - A simple console.log of Engine response for Game info

+ Features Not Implemented or nice to Haves :
    - Time Settings
    - Highlighting Legal Moves
    - Highlighting Checks 
    - Move History and replay to previous moves
    - Cross Compatibility - currently uses drag to move chess pieces : compatabile only on Desktop!
    - Pop-ups when in check or mated or stalemate
    - Promotion to selection of pieces (currently queen only)


## Technologies :


### Languages:

+ HTML
+ CSS
+ Javascript
    
### Libraries /Frameworks:
+ Boostrap
+ Jquery
+ Font-Awesome
+ StockFish.js
+ Chess.js
+ Chessboard.js

  
## Testing :



+ Header & Navigation bar :
     - Href links to correct elements -checked and working
     - Nav Bar correcly alligned for Desktop Version only ! 

+ Body  :
     - Loaded image links in various browsers (Firefox and Chrome)
     - Tested if Jquery appropriately showing captured pieces for White & Black
     
+ Game Logic :
    - Engine response for various chess openings from user 
    - Queen Promotion
    - Variety of game combinations tried :
        
            New game -> User Plays Game -> Switch to Black 
            New Game -> Switch to Black
            New Game -> Switch to Black -> Switch to White -> New Game
            
     
+ Full web page checks :
     - Tested all of the below on Mobile (iphone 6/7/8) ,desktop (firefox and chrome) and Ipad screens
     - Ran the web page for any html/css errors on https://validator.w3.org/
     












