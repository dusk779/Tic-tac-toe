const ctr=document.querySelector(".ctr");
const reset=document.getElementById("reset")
const won=document.getElementById("won");

const gameBoard=(()=> { 
  let board=Array(9).fill(null);
  
  const getBoard=()=>board;
  
  const updateBoard=(index,mark)=> {
    if(board[index]===null) {
      board[index]=mark;
      return true;
    }
    return false;
  };
  
  const resetBoard=()=> board.fill(null);
  
  const createboard = ()=>{
    ctr.innerHTML="";
    for(let i=0;i<board.length;i++) {
      const cell=document.createElement('div');
      cell.classList.add('cell');
      ctr.appendChild(cell);
    }
  }
  
  return {getBoard,updateBoard,resetBoard,createboard};
})();

//player factory function 
const player= (name,mark)=>{
  return {name,mark};
}

//GAME
const game=(()=> {
  let currentPlayer;
  const player1=player("Unknown","X");
  const player2=player("Dusk","O");
  
  const startgame=()=> {
    currentPlayer=player2;
    gameBoard.resetBoard();
    rendorgame()
  };
  
  const makemove=(index)=> {
    let wonplayer=currentPlayer;
    if(gameBoard.updateBoard(index,currentPlayer.mark)) {
      currentPlayer=currentPlayer===player1? player2: player1;
    }
        if(gamewon()) {
      won.textContent=`Congratulations ${wonplayer.name}: ${wonplayer.mark} Won`
    }
        if(isDraw()) {
          document.getElementById("won").textContent="Its a draw!!"
        }
    
    rendorgame();
  }
  const isDraw=()=> {
    let board=gameBoard.getBoard();
    
  return board.every(element => !gamewon() && element!==null)
  }
  
  const rendorgame=()=>{
    const board=gameBoard.getBoard();
    const cells=document.querySelectorAll(".cell");
    
    cells.forEach((cell,index)=>{
      
        cell.textContent=board[index]? board[index]:" ";
      
      
    })
    
  }
  const gamewon=()=> {
    let board=gameBoard.getBoard();
    
    for (let i = 0; i < 9; i += 3) {
        if (board[i] === board[i + 1] && board[i + 1] === board[i + 2] && board[i] !== null) {
            return true
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[i] === board[i + 3] && board[i + 3] === board[i + 6] && board[i] !== null) {
            return true
        }
    }

    // Check diagonals
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== null) {
        return true
    }
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== null) {
        return true
    }

    return false; // No winner
}
    
    
  
  
  
  return {startgame,makemove,rendorgame,gamewon};
})();

gameBoard.createboard();
game.startgame()

const cells=document.querySelectorAll(".cell");

cells.forEach((cell,index)=>{
  cell.addEventListener("click",()=>{
    if(game.gamewon())
  {
    return;
  }
    game.makemove(index);
  })
})
reset.addEventListener("click",()=>{
  won.textContent=""
  game.startgame()
})
