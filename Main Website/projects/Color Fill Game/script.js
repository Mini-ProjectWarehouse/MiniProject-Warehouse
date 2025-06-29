 const levelInstructions = {
      1: "Fill all medium and hard cells with any color.",
      2: "Create a smiley face using yellow and black colors.",
      3: "Make a heart shape using red color.",
      4: "Create a flag pattern with red, white, and blue.",
      5: "Make a tree using green and brown colors.",
      6: "Create a sun with yellow and orange colors.",
      7: "Make a star using yellow and white colors.",
      8: "Create a rainbow pattern using multiple colors.",
      9: "Make a house using various colors.",
      10: "Create your own pixel art masterpiece."
    };

    const artExamples = {
      2: [
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','black','black','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','black','black','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow']
      ],
      3: [
        ['red','red','white','white','white','white','red','red'],
        ['red','red','red','white','white','red','red','red'],
        ['red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red']
      ],
      4: [
        ['red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white']
      ],
      // Add more art examples for other levels as needed
    };

    function createArtExample(level) {
      const artContainer = document.getElementById('artExample');
      artContainer.innerHTML = '';
      if (!(level in artExamples)) {
        artContainer.textContent = 'No example available for this level.';
        return;
      }
      const pattern = artExamples[level];
      pattern.forEach(row => {
        row.forEach(color => {
          const cell = document.createElement('div');
          cell.style.backgroundColor = color;
          cell.style.border = '1px solid #bbb';
          cell.style.width = '100%';
          cell.style.height = '100%';
          cell.style.boxSizing = 'border-box';
          artContainer.appendChild(cell);
        });
      });
    }

    const levelPatterns = {
      2: [
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','black','black','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','black','black','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
        ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow']
      ],
      3: [
        ['red','red','white','white','white','white','red','red','red','red','red','red','red','red','red','red'],
        ['red','red','red','white','white','red','red','red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red']
      ],
      4: [
        ['red','white','blue','red','white','blue','red','white','red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white','red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white','red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white','red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white','red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white','red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white','red','white','blue','red','white','blue','red','white'],
        ['red','white','blue','red','white','blue','red','white','red','white','blue','red','white','blue','red','white']
      ],
      // Additional patterns for other levels can be added here
    };

    const gridConfigs = {
      1: Array(10).fill(Array(8).fill('medium')),  // Added 2 new rows to level 1 (from 8x8 to 10x8)
      2: Array(12).fill(Array(10).fill('medium')), // Changed level 2 to 10x10 grid with 12 rows (added 2 new rows)
      3: Array(16).fill(Array(16).fill('medium')),
      4: Array(16).fill(Array(16).fill('medium')),
      5: Array(16).fill(Array(16).fill('medium')),
      6: Array(16).fill(Array(16).fill('medium')),
      7: Array(16).fill(Array(16).fill('medium')),
      8: Array(16).fill(Array(16).fill('medium')),
      9: Array(16).fill(Array(16).fill('medium')),
      10: Array(16).fill(Array(16).fill('medium'))
    };

    const colors = [
      'red', 'green', 'blue', 'yellow', 'purple',
      'black', 'white', 'brown', 'pink', 'orange'
    ];

    const mainMenu = document.querySelector('.main_menu');
    const gameContainer = document.querySelector('.game_container');
    const gameGrid = document.querySelector('.main_game_box');
    const colorPicker = document.getElementById('colorPicker');
    const resetButton = document.getElementById('resetButton');
    const scoreboard = document.querySelector('.scoreboard');
    const messageBox = document.querySelector('.message');
    const instructionBox = document.querySelector('.instruction');

    let selectedColor = 'white';
    let currentLevel = null;
    let score = 0;
    let totalCellsToFill = 0;
    let filledCells = 0;

    function createColorPicker() {
      colorPicker.innerHTML = '';
      colors.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'game_color_name';
        btn.style.backgroundColor = color;
        btn.setAttribute('aria-label', color);
        btn.setAttribute('role', 'listitem');
        btn.setAttribute('tabindex', '0');
        if (color === selectedColor) btn.classList.add('selected');
        btn.addEventListener('click', () => {
          selectColor(color, btn);
        });
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectColor(color, btn);
          }
        });
        colorPicker.appendChild(btn);
      });
    }

    function selectColor(color, btn) {
      selectedColor = color;
      document.querySelectorAll('.game_color_name').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    }

    function createGrid(level) {
      gameGrid.innerHTML = '';
      const gridConfig = gridConfigs[level];
      totalCellsToFill = 0;
      filledCells = 0;
      score = 0;
      updateScore();
      instructionBox.textContent = levelInstructions[level] || '';

      // Dynamically set grid-template-columns and grid-template-rows based on gridConfig size
      const numRows = gridConfig.length;
      const numCols = gridConfig[0].length;
      gameGrid.style.display = 'grid';
      gameGrid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
      gameGrid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
      gameGrid.style.gap = '2px';

      gridConfig.forEach((rowConfig, rowIndex) => {
        rowConfig.forEach((difficulty, colIndex) => {
          const cell = document.createElement('div');
          cell.className = 'main_game_data';
          cell.setAttribute('data-difficulty', difficulty);
          cell.setAttribute('role', 'gridcell');
          cell.setAttribute('tabindex', '0');
          cell.setAttribute('aria-label', `Cell at row ${rowIndex + 1} column ${colIndex + 1}, difficulty ${difficulty}`);
          cell.style.backgroundColor = 'white';

          totalCellsToFill++;

          cell.addEventListener('click', () => {
            if (cell.style.backgroundColor !== selectedColor) {
              cell.style.backgroundColor = selectedColor;
              filledCells++;
              score += 10;
              updateScore();
              checkLevelCompletion();
            }
          });
          cell.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (cell.style.backgroundColor !== selectedColor) {
                cell.style.backgroundColor = selectedColor;
                filledCells++;
                score += 10;
                updateScore();
                checkLevelCompletion();
              }
            }
          });
          gameGrid.appendChild(cell);
        });
      });
    }

    function updateScore() {
      scoreboard.textContent = `Score: ${score}`;
    }

    function checkLevelCompletion() {
      // Check if the current grid matches the pattern for the level if any
      if (currentLevel in levelPatterns) {
        const pattern = levelPatterns[currentLevel];
        let matches = true;
        const cells = gameGrid.children;
        for (let i = 0; i < cells.length; i++) {
          const row = Math.floor(i / 16);
          const col = i % 16;
          const expectedColor = pattern[row][col];
          const cellColor = cells[i].style.backgroundColor;
          // Convert color names to rgb for comparison
          const tempDiv = document.createElement('div');
          tempDiv.style.color = expectedColor;
          document.body.appendChild(tempDiv);
          const expectedRGB = getComputedStyle(tempDiv).color;
          document.body.removeChild(tempDiv);
          if (cellColor !== expectedRGB) {
            matches = false;
            break;
          }
        }
        if (matches) {
          messageBox.textContent = `Congratulations! You completed Level ${currentLevel}.`;
          unlockNextLevel();
        } else {
          messageBox.textContent = '';
        }
      } else {
        // For levels without pattern, just check if all cells are filled
        if (filledCells >= totalCellsToFill) {
          messageBox.textContent = `Congratulations! You completed Level ${currentLevel}.`;
          unlockNextLevel();
        } else {
          messageBox.textContent = '';
        }
      }
    }

    function unlockNextLevel() {
      const nextLevel = currentLevel + 1;
      if (nextLevel <= 10) {
        const nextButton = mainMenu.querySelector(`button[data-level="${nextLevel}"]`);
        if (nextButton) {
          nextButton.disabled = false;
        }
      }
    }

    function resetGrid() {
      document.querySelectorAll('.main_game_data').forEach(cell => {
        cell.style.backgroundColor = 'white';
      });
      filledCells = 0;
      score = 0;
      updateScore();
      messageBox.textContent = '';
    }

    function startLevel(level) {
      currentLevel = level;
      mainMenu.hidden = true;
      gameContainer.hidden = false;
      messageBox.textContent = '';
      createGrid(level);
      createColorPicker();
      createArtExample(level);
      updateScore();
    }

    // Event listeners for level buttons
    mainMenu.querySelectorAll('.level_button').forEach(button => {
      button.removeEventListener('click', () => {}); // Remove old listeners if any
    });

    // New carousel logic
    const prevLevelBtn = document.getElementById('prevLevel');
    const nextLevelBtn = document.getElementById('nextLevel');
    const currentLevelDisplay = document.getElementById('currentLevelDisplay');
    const startLevelButton = document.getElementById('startLevelButton');
    const previewGrid = document.getElementById('previewGrid');

    let selectedLevel = 1;
    const maxLevel = 10;
    const minLevel = 1;

    // Define grid sizes for levels (e.g., level 1: 8x8, level 2: 10x10, etc.)
    const levelGridSizes = {
      1: 8,
      2: 10,
      3: 12,
      4: 14,
      5: 16,
      6: 18,
      7: 20,
      8: 22,
      9: 24,
      10: 26
    };

    function updateLevelDisplay() {
      currentLevelDisplay.textContent = `Level ${selectedLevel}`;
      updatePreviewGrid(selectedLevel);
    }

    function updatePreviewGrid(level) {
      const size = levelGridSizes[level] || 8;
      previewGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      previewGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
      previewGrid.innerHTML = '';
      const totalCells = size * size;
      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.style.border = '1px solid #bbb';
        cell.style.backgroundColor = 'white';
        previewGrid.appendChild(cell);
      }
    }

    prevLevelBtn.addEventListener('click', () => {
      selectedLevel = selectedLevel > minLevel ? selectedLevel - 1 : maxLevel;
      updateLevelDisplay();
    });

    nextLevelBtn.addEventListener('click', () => {
      selectedLevel = selectedLevel < maxLevel ? selectedLevel + 1 : minLevel;
      updateLevelDisplay();
    });

    startLevelButton.addEventListener('click', () => {
      startLevel(selectedLevel);
    });

    resetButton.addEventListener('click', resetGrid);

    // Initialize
    updateLevelDisplay();
    createColorPicker();
