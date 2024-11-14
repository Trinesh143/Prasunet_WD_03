// Selecting elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

// Game variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// Winning combinations
const winningConditions = [
  [0, 1, 2], // First row
  [3, 4, 5], // Second row
  [6, 7, 8], // Third row
  [0, 3, 6], // First column
  [1, 4, 7], // Second column
  [2, 5, 8], // Third column
  [0, 4, 8], // Diagonal from top left to bottom right
  [2, 4, 6]  // Diagonal from top right to bottom left
];

// Functions to handle game state
function handleClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] !== '' || !isGameActive) {
    return;
  }

  updateCell(cell, index);
  checkResult();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = 'It\'s a Draw!';
    isGameActive = false;
    return;
  }

  switchPlayer();
}

// Resetting the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

// Adding event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
