import { BASE_POSITIONS, HOME_ENTRANCE, HOME_POSITIONS, PLAYERS, SAFE_POSITIONS, START_POSITIONS, STATE, TURNING_POINTS } from './constants.js';
import { UI } from './ui.js';
export class Ludo {
    currentPositions = {
        P1: [],//for the blue or player one
        P2: [],//fot  
        P3: [], 
        P4: []  
    }
 //for the dice value
    _diceValue;
    get diceValue() {
        return this._diceValue;
    }
          set diceValue(value) {
        this._diceValue = value;
           UI.setDiceValue(value);
           }
 
    _turn;

    
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
        UI.setTurn(value);
    }

    _state;
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
        if (value === STATE.DICE_NOT_ROLLED) {
            UI.enableDice();
            UI.unhighlightPieces();
        } else {
            UI.disableDice();
        }
    }

    constructor() {
        console.log('4 Player Ludo game initialized! Let\'s play!');

        this.listenDiceClick();
        this.listenResetClick();
        this.listenPieceClick();

        this.resetGame();
    }

    listenDiceClick() {
        UI.listenDiceClick(this.onDiceClick.bind(this));
    }
//just to create the random number that 
    onDiceClick() {
        console.log('Dice clicked!');
        this.diceValue = 1 + Math.floor(Math.random() * 6);
        this.state = STATE.DICE_ROLLED;

        this.checkForEligiblePieces();
    }
//to give permission to move the pieces
    checkForEligiblePieces() {
        const player = PLAYERS[this.turn];
        const eligiblePieces = this.getEligiblePieces(player);

        if (eligiblePieces.length) {
            UI.highlightPieces(player, eligiblePieces);
        } else {
            this.incrementTurn();
        }
    }
//turn if the dice is not rolled six its the other player turn
    incrementTurn() {
        this.turn = (this.turn + 1) % PLAYERS.length; // Cycle through all players
        this.state = STATE.DICE_NOT_ROLLED;
    }

    getEligiblePieces(player) {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = this.currentPositions[player][piece];

            if (currentPosition === HOME_POSITIONS[player]) {
                return false;
            }

            if (
                BASE_POSITIONS[player].includes(currentPosition) &&
                this.diceValue !== 6
            ) {
                return false;
            }

            if (
                HOME_ENTRANCE[player].includes(currentPosition) &&
                (currentPosition + this.diceValue > HOME_POSITIONS[player])
            ) {
                return false;
            }

            return true;
        });
    }

    listenResetClick() {
        UI.listenResetClick(this.resetGame.bind(this));
    }

    resetGame() {
        console.log('Resetting 4 player game...');
        this.currentPositions = structuredClone(BASE_POSITIONS);

        PLAYERS.forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                this.setPiecePosition(player, piece, this.currentPositions[player][piece]);
            });
        });

        this.turn = 0; // P1 starts
        this.state = STATE.DICE_NOT_ROLLED;
        this.diceValue = 0;
    }

    listenPieceClick() {
        UI.listenPieceClick(this.onPieceClick.bind(this));
    }

    onPieceClick(event) {
        const target = event.target;

        if (!target.classList.contains('player-piece') || !target.classList.contains('highlight')) {
            return;
        }
        console.log('Piece clicked!');

        const player = target.getAttribute('player-id');
        const piece = parseInt(target.getAttribute('piece'), 10);

        this.handlePieceClick(player, piece);
    }

    handlePieceClick(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if (BASE_POSITIONS[player].includes(currentPosition)) {
            this.setPiecePosition(player, piece, START_POSITIONS[player]);
            this.state = STATE.DICE_NOT_ROLLED; // Grant another turn for rolling a 6
            return;
        }

        UI.unhighlightPieces();
        this.movePiece(player, piece, this.diceValue);
    }

    setPiecePosition(player, piece, newPosition) {
        this.currentPositions[player][piece] = newPosition;
        UI.setPiecePosition(player, piece, newPosition);
    }

    movePiece(player, piece, moveBy) {
        const interval = setInterval(() => {
            this.incrementPiecePosition(player, piece);
            moveBy--;

            if (moveBy === 0) {
                clearInterval(interval);

                if (this.hasPlayerWon(player)) {
                    alert(`Player: ${player} has won!`);
                    this.resetGame();
                    return;
                }

                const isKill = this.checkForKill(player, piece);

                if (isKill || this.diceValue === 6) {
                    this.state = STATE.DICE_NOT_ROLLED;
                    return;
                }

                this.incrementTurn();
            }
        }, 200);
    }

    checkForKill(player, piece) {
        const currentPosition = this.currentPositions[player][piece];
        let kill = false;

        // Iterate through all other players
        PLAYERS.forEach(opponent => {
            if (opponent === player) return; // Skip current player

            // Iterate through opponent's pieces
            [0, 1, 2, 3].forEach(oppPiece => {
                const opponentPosition = this.currentPositions[opponent][oppPiece];

                if (currentPosition === opponentPosition && !SAFE_POSITIONS.includes(currentPosition)) {
                    this.setPiecePosition(opponent, oppPiece, BASE_POSITIONS[opponent][oppPiece]);
                    kill = true;
                }
            });
        });

        return kill;
    }

    hasPlayerWon(player) {
        return [0, 1, 2, 3].every(piece => this.currentPositions[player][piece] === HOME_POSITIONS[player]);
    }

    incrementPiecePosition(player, piece) {
        this.setPiecePosition(player, piece, this.getIncrementedPosition(player, piece));
    }

    getIncrementedPosition(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        // Player is at their turning point, move to home entrance
        if (currentPosition === TURNING_POINTS[player]) {
            return HOME_ENTRANCE[player][0];
        }
        // Player is on their home path
        else if (HOME_ENTRANCE[player].includes(currentPosition)) {
            const homePathIndex = HOME_ENTRANCE[player].indexOf(currentPosition);
            // If at the last step of the defined home entrance path, move to final home position
            if (homePathIndex === HOME_ENTRANCE[player].length - 1) {
                return HOME_POSITIONS[player];
            }
            return currentPosition + 1; // Assumes home entrance positions are numerically sequential
        } else if (currentPosition === 51) { // All players loop from 51 to 0 on the main track
            return 0;
        } // Default: move to the next square on the main track
        return currentPosition + 1; 
    }
}