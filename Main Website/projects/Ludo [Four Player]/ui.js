//imported from the constant.js file//
import { COORDINATES_MAP, PLAYERS, STEP_LENGTH } from './constants.js';/**this is the use of module in the type of java script */
//calling the footer buttons in the index.html
const diceButtonElement = document.querySelector('#dice-btn');
const resetButtonElement = document.querySelector('#reset-btn');
const playerPiecesContainer = document.querySelector('.player-pieces');

const playerPiecesElements = {
    P1: document.querySelectorAll('[player-id="P1"].player-piece'),// it uses id to select all the player piece
    P2: document.querySelectorAll('[player-id="P2"].player-piece'),
    P3: document.querySelectorAll('[player-id="P3"].player-piece'), 
    P4: document.querySelectorAll('[player-id="P4"].player-piece'), 
}
//exporting the class ui to ludo .js
export class UI {

    static listenDiceClick(callback) {
        if (diceButtonElement) {
            diceButtonElement.addEventListener('click', callback);
        } else {
            console.error('UI Error: Dice button element (#dice-btn) not found!');
        }
    }
//functiom to reset the dice value only
    static listenResetClick(callback) {
        if (resetButtonElement) {
            resetButtonElement.addEventListener('click', callback);//.add event listener is used when a specific function is called
        } else {
            console.error('UI Error: Reset button element (#reset-btn) not found!');
        }
    } 
//the callback function is used to pass argument to other function when executed
    static listenPieceClick(callback) {
        if (playerPiecesContainer) {
            playerPiecesContainer.addEventListener('click', callback);
        } else {
            console.error('UI Error: Player pieces container element (.player-pieces) not found!');
        }
    }
//function to set the player and puiece positiom where it is lands as the rolled dice value from constant .js
    static setPiecePosition(player, piece, newPosition) {
        if (!playerPiecesElements[player] || !playerPiecesElements[player][piece]) {
            console.error(`UI Error: Player element of given player: ${player} and piece: ${piece} not found in DOM.`);
            return;
        }

        const coordinates = COORDINATES_MAP[newPosition];
        if (!coordinates) {
            console.error(`UI Error: Coordinates not found for newPosition: ${newPosition} in COORDINATES_MAP.`);
            return;
        }
//to find the grid height for the player piece and the cell value from constant .js
        const [x, y] = coordinates;
        const pieceElement = playerPiecesElements[player][piece];

        pieceElement.style.top = y * STEP_LENGTH + '%';
        pieceElement.style.left = x * STEP_LENGTH + '%';
    }

    static setTurn(index) {
        if (index < 0 || index >= PLAYERS.length) {
            console.error('UI Error: Turn index out of bounds!');
            return;
        }
//for the active player is playing or not
        const player = PLAYERS[index];
        const activePlayerSpan = document.querySelector('.active-player span');
        if (activePlayerSpan) {
            activePlayerSpan.innerText = player;
        } else {
            console.warn('UI Warning: .active-player span element not found.');
        }

        // Remove highlight from previously active player base
        document.querySelectorAll('.player-base.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        });

        // Add highlight to the current active player's base
        const currentPlayerBase = document.querySelector(`[player-id="${player}"].player-base`);
        if (currentPlayerBase) {
            currentPlayerBase.classList.add('highlight');
        } else {
            console.error(`UI Error: Player base for ${player} not found.`);
        }
    }
// to enable the dice button after the player chooses 
    static enableDice() {
        if (diceButtonElement) {
            diceButtonElement.removeAttribute('disabled');
        }
    }
//to disable the roll buttom for the player to choose its player
    static disableDice() {
        if (diceButtonElement) {
            diceButtonElement.setAttribute('disabled', '');
        }
    }
//to highlight the player pieces
    static highlightPieces(player, pieces) {
        pieces.forEach(piece => {
            const pieceElement = playerPiecesElements[player][piece];
            if (pieceElement) {
                pieceElement.classList.add('highlight');
            }
        });
    }
//to unhighlight the player piece using ele whatever it means
    static unhighlightPieces() {
        document.querySelectorAll('.player-piece.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        });
    }
// the function is usrd to set dice value which is imn the ludo.js file
    static setDiceValue(value) {
        const diceValueElement = document.querySelector('.dice-value');
        if (diceValueElement) {
            diceValueElement.innerText = value;
        } else {
            console.warn('UI Warning: .dice-value element not found.');
        }
    }
}