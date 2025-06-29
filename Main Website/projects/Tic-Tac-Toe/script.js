// This function waits for the full page to load before running any code
document.addEventListener('DOMContentLoaded', () => {
  // Get all necessary elements from the HTML
  const cells = document.querySelectorAll('.cell'); // All 9 cells of the board
  const status = document.getElementById('status'); // Text showing whose turn it is
  const restartButton = document.getElementById('restartButton'); // Restart button

  // Sound for click — plays when a cell is clicked
  const clickSound = document.getElementById('click_sound');

  // Initialize the game state
  let board = ['', '', '', '', '', '', '', '', '']; // Empty board
  let currentPlayer = 'O'; // First player is always 'O'
  let isGameActive = true; // The game starts as active

  // All possible winning combinations (rows, columns, diagonals)
  const winningConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
  ];

  // Function to handle when a player clicks on a cell
  function handleCellPlayed(clickedCell, clickedIndex) {
    board[clickedIndex] = currentPlayer; // Mark the cell in the board array
    clickedCell.textContent = currentPlayer; // Show X or O in the cell
    clickedCell.classList.add('disabled'); // Prevent clicking on the same cell again
  }

  // Function to change the turn between players
  function handlePlayerChange() {
    // If current player is X, switch to O; otherwise switch to X
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`; // Update the status text
  }

  // Function to check if someone won or it's a draw
  function handleResultValidation() {
    let roundWon = false;

    // Loop through all winning combinations
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];

      // If any cell in the combination is empty, continue checking
      if (a === '' || b === '' || c === '') {
        continue;
      }

      // If all 3 cells are equal, we have a winner
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    // If someone won, show message and end the game
    if (roundWon) {
      isGameActive = false;
      const boardElement = document.getElementById('board');
      const winnerMessage = document.getElementById('winnerMessage');

      // Animate board disappearing
      boardElement.classList.add('fade-out');
      boardElement.addEventListener('animationend', () => {
        boardElement.style.display = 'none';
        winnerMessage.textContent = `Player ${currentPlayer} has won!`;
        winnerMessage.classList.add('fade-in');
      }, { once: true });

      return;
    }

    // If no one won and board is full -> draw
    if (!board.includes('')) {
      status.textContent = `Game ended in a draw!`;
      isGameActive = false;
      return;
    }

    // If no win or draw, change to next player
    handlePlayerChange();
  }

  // When user clicks on any cell
  function handleCellClick(event) {
    const clickedCell = event.target; // Which cell was clicked
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index')); // Get index from cell

    // If cell is already filled or game is over, do nothing
    if (board[clickedIndex] !== '' || !isGameActive) {
      return;
    }

    clickSound.play(); // Play click sound
    handleCellPlayed(clickedCell, clickedIndex); // Mark cell
    handleResultValidation(); // Check win/draw
  }

  // Function to restart the game
  function handleRestartGame() {
    // Reset everything to starting state
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'O';
    status.textContent = `Player ${currentPlayer}'s turn`;

    // Show board again and remove animations
    const boardElement = document.getElementById('board');
    const winnerMessage = document.getElementById('winnerMessage');
    boardElement.style.display = 'grid';
    boardElement.classList.remove('fade-out');
    winnerMessage.textContent = '';
    winnerMessage.classList.remove('fade-in');

    // Clear all cells
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('disabled');
    });
  }

  // Add event listeners to every cell for clicking
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  // Add event listener to restart button
  restartButton.addEventListener('click', handleRestartGame);

  // Show initial message at game start
  status.textContent = `Player ${currentPlayer}'s turn`;
});
