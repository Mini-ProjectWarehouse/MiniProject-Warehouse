
    // === DOM Elements ===
    const board = document.getElementById("board");
    const diceResultText = document.getElementById("diceResult");
    const playersPositionsText = document.getElementById("playersPositions");
    const currentTurnText = document.getElementById("currentTurn");
    const rollDiceBtn = document.getElementById("rollDiceBtn");
    const customAlert = document.getElementById("customAlert");
    const diceContainer = document.getElementById("diceContainer");

    // Sounds
    const soundDice = document.getElementById("soundDice");
    const soundTrap = document.getElementById("soundTrap");
    const soundBoost = document.getElementById("soundBoost");
    const soundWin = document.getElementById("soundWin");

    // === Game State Variables ===
    const totalCells = 100;
    const traps = [18, 45, 70, 88];
    const boosts = [10, 25, 55, 85];
    let playerPositions = [1, 1];  // Player 1 and Player 2 start at cell 1
    let currentPlayerIndex = 0;     // 0 = Player 1, 1 = Player 2
    let diceCubeElement = null;

    /**
     * Create the board with zigzag numbered cells,
     * add traps and boosts styling.
     */
    function createBoard() {
      board.innerHTML = "";

      for (let row = 9; row >= 0; row--) {
        for (let col = 0; col < 10; col++) {
          // Zigzag numbering: even rows left to right, odd rows right to left
          let cellNumber = (row % 2 === 0)
            ? row * 10 + col + 1
            : row * 10 + (9 - col) + 1;

          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.id = `cell-${cellNumber}`;
          cell.textContent = cellNumber;

          if (traps.includes(cellNumber)) cell.classList.add("trap");
          else if (boosts.includes(cellNumber)) cell.classList.add("boost");

          board.appendChild(cell);
        }
      }

      createPlayerTokens();
      updatePlayersPositionDisplay();
      updatePlayerTokensPosition();
    }

    /**
     * Create player token elements on the board if they don't exist yet.
     * Player 1: cyan token with '1'
     * Player 2: pink token with '2'
     */
    function createPlayerTokens() {
      for (let i = 0; i < 2; i++) {
        if (!document.querySelector(`.player-token.player${i+1}`)) {
          const token = document.createElement("div");
          token.classList.add("player-token", `player${i+1}`);
          token.textContent = (i + 1).toString();
          board.appendChild(token);
        }
      }
    }

    /**
     * Update the position text info for both players
     * and show current player's turn.
     */
    function updatePlayersPositionDisplay() {
      playersPositionsText.textContent =
        `Player 1 Position: ${playerPositions[0]} | Player 2 Position: ${playerPositions[1]}`;
      currentTurnText.textContent = `Current Turn: Player ${currentPlayerIndex + 1}`;
    }

    /**
     * Position the player tokens visually inside their respective cells.
     * Players' tokens are offset horizontally inside the cell to avoid overlap.
     */
    function updatePlayerTokensPosition() {
      for (let i = 0; i < 2; i++) {
        const token = document.querySelector(`.player-token.player${i+1}`);
        if (!token) continue;

        let pos = playerPositions[i];
        let posIndex = pos - 1;
        let row = Math.floor(posIndex / 10);
        let col = posIndex % 10;
        if (row % 2 === 1) col = 9 - col;  // zigzag row adjustment

        // Calculate pixel position: each cell ~47px including gap
        // Vertical offset from top, horizontal offset from left
        // Player 1 token on left inside cell, Player 2 on right
        let topPx = (9 - row) * 47 + 13;  // 13px vertical center offset
        let leftPx = col * 47 + (i === 0 ? 13 : 33);  // horizontal offset per player

        token.style.top = `${topPx}px`;
        token.style.left = `${leftPx}px`;
      }
    }

    /**
     * Show a custom neon alert at the top center with a message for a duration.
     * @param {string} message - Message text to display
     * @param {number} duration - How long to show the alert (ms)
     */
    function showCustomAlert(message, duration = 3000) {
      customAlert.textContent = message;
      customAlert.classList.add("show");
      setTimeout(() => {
        customAlert.classList.remove("show");
      }, duration);
    }

    /**
     * Create the 3D dice cube element with faces and dots.
     * Returns the dice cube element.
     */
    function createDiceCube() {
      diceContainer.innerHTML = "";

      const cube = document.createElement("div");
      cube.classList.add("dice-cube");

      const facesData = [
        {className: "face-front", dots: ["middle-center"]}, // 1
        {className: "face-back", dots: ["top-left", "bottom-right"]}, // 2
        {className: "face-right", dots: ["top-left", "middle-center", "bottom-right"]}, // 3
        {className: "face-left", dots: ["top-left", "top-right", "bottom-left", "bottom-right"]}, // 4
        {className: "face-top", dots: ["top-left", "top-right", "middle-center", "bottom-left", "bottom-right"]}, // 5
        {className: "face-bottom", dots: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"]}, // 6
      ];

      facesData.forEach(({className, dots}) => {
        const face = document.createElement("div");
        face.classList.add("face", className);
        dots.forEach(dotClass => {
          const dot = document.createElement("div");
          dot.classList.add("dot", dotClass);
          dot.style.width = "14px";
          dot.style.height = "14px";
          face.appendChild(dot);
        });
        cube.appendChild(face);
      });

      diceContainer.appendChild(cube);
      return cube;
    }

    // Predefined dice rotations for faces 1-6
    const diceRotations = [
      "rotateX(0deg) rotateY(0deg)",          // 1
      "rotateY(-180deg)",                     // 2
      "rotateY(-90deg)",                      // 3
      "rotateY(90deg)",                       // 4
      "rotateX(-90deg)",                      // 5
      "rotateX(90deg) rotateY(180deg)",      // 6
    ];

    /**
     * Animate the dice roll by randomly changing the face multiple times,
     * then stopping at the final face.
     * @param {number} finalFace - final dice face value (1-6)
     * @param {function} onComplete - callback after animation finishes
     */
    function animateDiceRoll(finalFace, onComplete) {
      let rollsCount = 0;
      const maxRolls = 15;
      soundDice.currentTime = 0;
      soundDice.play();

      const diceRollInterval = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 6);
        setDiceFace(randomFace);

        rollsCount++;
        if (rollsCount >= maxRolls) {
          clearInterval(diceRollInterval);
          setDiceFace(finalFace - 1);
          if (onComplete) onComplete();
        }
      }, 50);
    }

    /**
     * Set the dice cube to display the given face index (0-based).
     * @param {number} faceIndex - 0 to 5
     */
    function setDiceFace(faceIndex) {
      if (!diceCubeElement) diceCubeElement = createDiceCube();
      diceCubeElement.style.transform = diceRotations[faceIndex];
      diceResultText.textContent = `Dice: ${faceIndex + 1}`;
    }

    /**
     * Handle rolling the dice, moving the current player,
     * and switching turns accordingly.
     */
    function handleDiceRoll() {
      rollDiceBtn.disabled = true;
      const diceValue = Math.floor(Math.random() * 6) + 1;

      animateDiceRoll(diceValue, () => {
        moveCurrentPlayer(diceValue);
        rollDiceBtn.disabled = false;
      });
    }

    /**
     * Move the current player's token by the dice value,
     * handle traps, boosts, win condition, and switch turns.
     * @param {number} steps - dice roll value
     */
    function moveCurrentPlayer(steps) {
      // Move player forward by dice roll
      playerPositions[currentPlayerIndex] += steps;
      if (playerPositions[currentPlayerIndex] > totalCells) {
        playerPositions[currentPlayerIndex] = totalCells;
      }

      updatePlayerTokensPosition();
      updatePlayersPositionDisplay();

      // Delay trap/boost and win check for smooth animation
      setTimeout(() => {
        const pos = playerPositions[currentPlayerIndex];
        if (traps.includes(pos)) {
          soundTrap.currentTime = 0;
          soundTrap.play();
          showCustomAlert(`💥 Player ${currentPlayerIndex + 1} hit a Trap! Back to Start.`, 4000);
          playerPositions[currentPlayerIndex] = 1;
          updatePlayerTokensPosition();
          updatePlayersPositionDisplay();
        }
        else if (boosts.includes(pos)) {
          soundBoost.currentTime = 0;
          soundBoost.play();
          showCustomAlert(`🚀 Player ${currentPlayerIndex + 1} got a Boost! Moving Forward 7!`, 4000);
          playerPositions[currentPlayerIndex] += 7;
          if (playerPositions[currentPlayerIndex] > totalCells) {
            playerPositions[currentPlayerIndex] = totalCells;
          }
          updatePlayerTokensPosition();
          updatePlayersPositionDisplay();
        }

        // Win check
        if (playerPositions[currentPlayerIndex] === totalCells) {
          soundWin.currentTime = 0;
          soundWin.play();
          showCustomAlert(`🎉 Player ${currentPlayerIndex + 1} Wins! Congratulations! 🎉`, 7000);
          rollDiceBtn.disabled = true;
          return;
        }

        // Switch player turn
        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        updatePlayersPositionDisplay();
      }, 700);
    }

    // === Initialization ===
    createBoard();
    diceCubeElement = createDiceCube();
    setDiceFace(0); // Show dice face 1 initially

    // === Event Listeners ===
    rollDiceBtn.addEventListener("click", handleDiceRoll);
  