const XClass = "x";
const YClass = "y";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

restartButton.addEventListener("click", (e) => {
  restartGame();
});

let YTurn = false;
cellElements.forEach((cell) => {
  cell.addEventListener("click", clickHandler, { once: true });
});

function restartGame() {
  let YTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(XClass);
    cell.classList.remove(YClass);
    cell.removeEventListener("click", clickHandler);
    cell.addEventListener("click", clickHandler, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function clickHandler(e) {
  const cell = e.target;
  //placeMark
  const currentClass = YTurn ? YClass : XClass;
  placeMark(cell, currentClass);
  //Check for win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  //Check for Draw
  else if (isDraw()) {
    endGame(true);
  } else {
    //Switch Turn
    swapTurns();
    //hoverEffect
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerHTML = `${
      YTurn
        ? "<img src='./imgs/cat2.png' /> "
        : "<img src='./imgs/cat1.png' /> "
    } wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(XClass) || cell.classList.contains(YClass);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  YTurn = !YTurn;
}

function setBoardHoverClass() {
  board.classList.remove(XClass);
  board.classList.remove(YClass);
  if (YTurn) {
    board.classList.add(YClass);
  } else {
    board.classList.add(XClass);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((comb) => {
    return comb.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
