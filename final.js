// adapted from [https://www.youtube.com/watch?v=E621N5GBKv8] //

const boxes = Array.from(document.getElementsByClassName("box"));
const playText = document.getElementById('playText');
const restartButton = document.getElementById('restartButton')
const board = document.querySelector("#board");
const spaces = [null, null, null, null, null, null, null, null, null];
const playerO = "O";
const playerX = "X";
let currentPlayer = playerO;
console.log(boxes);

// creating the grid for the board //
const createBoard = () => {
  boxes.forEach((box, index) => {
    let styleLine = '';
    if (index < 3) {
        styleLine += 'border-bottom: 3px solid #343a40;';
    }            
    if(index % 3 === 0){
      styleLine += 'border-right: 3px solid #343a40;';
    }
    if(index % 3 === 2){
      styleLine += 'border-left: 3px solid #343a40;';
    }
    if(index > 5) {
      styleLine += 'border-top: 3px solid #343a40;';
    }
    box.style = styleLine;
    box.addEventListener('click', boxClicked);
 });
};
//function for clicking boxer and putting either a circle or and cross//
function boxClicked(e) {
  console.log('box clicked');
  const id = e.target.id;
  console.log(id);
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    //checks to see if payer has one and creates winning text//
    if (hasPlayerWon(currentPlayer)) {
      playText.innerHTML = `${currentPlayer} is the winner!`;
      //makes board grey to help signify game over//
      let gameWon = document.querySelector("#board");
      gameWon.style.backgroundColor = "#343a40";
      return;
    }

    //makes sure that the players turn is changing//
    currentPlayer = currentPlayer === playerO ? playerX : playerO;
    
  }
 
}
//defining hasPlayerWon variable by showing every possiblity of winning//
const hasPlayerWon = (player) => {
  //checking the top row//
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      console.log(`${player} wins up top`);
      return true;
    }
    //checks left collumn//
    if (spaces[3] === player && spaces[6] === player) {
      console.log(`${player} wins on the left`);
      return true;
    }
    //checks top left to bottom right diagnol//
    if (spaces[4] === player && spaces[8] === player) {
      console.log(`${player} wins on the left diagonal`);
      return true;
    }
  }
  //checks right collumn//
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      console.log(`${player} wins on the right`);
      return true;
    }
    //checks botton row
    if (spaces[7] === player && spaces[6] === player) {
      console.log(`${player} wins on the bottom`);
      return true;
    }
    
  }
  //checks middle row//
  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      console.log(`${player} wins on the middle horizontal`);
      return true;
    }
    //checks middle column
    if (spaces[1] === player && spaces[7] === player) {
      console.log(`${player} wins on the middle vertical`);
      return true;
    }
    //checking bottom left to top right diagnal//
  if (spaces[2] === player && spaces[4] === player && spaces [6] ===player) {
    console.log(`${player} wins on right diagnol`);
    return true;
  } 
 
  }
};

//function for restart button//
restartButton.addEventListener("click", () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  //clearing change in background color that signifies ends of game//
  let myElement = document.querySelector("#board");
      myElement.style.backgroundColor= "";
  playText.innerHTML = `Tic-Tac-Toe`;

  currentPlayer = playerO;
});

createBoard();