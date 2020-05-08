// Re write to call with stockfish js only



//   Functions to call Engine Game 



function uciCmd(cmd, which) {
        console.log("UCI: " + cmd);
        
        (which || engine).postMessage(cmd);
    }
    uciCmd('uci');