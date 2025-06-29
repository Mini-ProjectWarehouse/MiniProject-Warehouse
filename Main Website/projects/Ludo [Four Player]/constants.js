export const COORDINATES_MAP = {
    // P1 (Blue) path - Starts at 0
    0: [6.5, 13.5], 1: [6.5, 12.5], 2: [6.5, 11.5], 3: [6.5, 10.5], 4: [6.5, 9.5],
    5: [5.5, 8.5], 6: [4.5, 8.5], 7: [3.5, 8.5], 8: [2.5, 8.5], 9: [1.5, 8.5], 10: [0.5, 8.5],
    11: [0.5, 7.5], // Corner
    12: [0.5, 6.5], 13: [1.5, 6.5], 14: [2.5, 6.5], 15: [3.5, 6.5], 16: [4.5, 6.5], 17: [5.5, 6.5],
    18: [6.5, 5.5], 19: [6.5, 4.5], 20: [6.5, 3.5], 21: [6.5, 2.5], 22: [6.5, 1.5], 23: [6.5, 0.5],
    24: [7.5, 0.5], // Corner
    25: [8.5, 0.5], 26: [8.5, 1.5], 27: [8.5, 2.5], 28: [8.5, 3.5], 29: [8.5, 4.5], 30: [8.5, 5.5],
    31: [9.5, 6.5], 32: [10.5, 6.5], 33: [11.5, 6.5], 34: [12.5, 6.5], 35: [13.5, 6.5], 36: [14.5, 6.5],
    37: [14.5, 7.5], // Corner
    38: [14.5, 8.5], 39: [13.5, 8.5], 40: [12.5, 8.5], 41: [11.5, 8.5], 42: [10.5, 8.5], 43: [9.5, 8.5],
    44: [8.5, 9.5], 45: [8.5, 10.5], 46: [8.5, 11.5],
    47: [8.5, 12.5], 48: [8.5, 13.5], 49: [8.5, 14.5], // Added missing coordinates
    50: [7.5, 14.5], // Corner, P1's turning point
    51: [6.5, 14.5], // Final square on main track before looping to 0

    // HOME ENTRANCE FOR P1 (Blue)
    100: [7.5, 13.5], 101: [7.5, 12.5], 102: [7.5, 11.5], 103: [7.5, 10.5], 104: [7.5, 9.5],
    105: [7.5, 8.5], // Final home position for P1

    // HOME ENTRANCE FOR P2 (Green)
    200: [1.5, 7.5], 201: [2.5, 7.5], 202: [3.5, 7.5], 203: [4.5, 7.5], 204: [5.5, 7.5],
    205: [6.5, 7.5], // Final home position for P2

    // HOME ENTRANCE FOR P3 (Red)
    300: [7.5, 1.5], 301: [7.5, 2.5], 302: [7.5, 3.5], 303: [7.5, 4.5], 304: [7.5, 5.5],
    305: [7.5, 6.5], // Final home position for P3

    // HOME ENTRANCE FOR P4 (Yellow)
    400: [13.5, 7.5], 401: [12.5, 7.5], 402: [11.5, 7.5], 403: [10.5, 7.5], 404: [9.5, 7.5],
    405: [8.5, 7.5], // Final home position for P4


    // BASE POSITIONS
    // P1 (Blue) Base
    500: [1.5, 10.58], 501: [3.57, 10.58], 502: [1.5, 12.43], 503: [3.57, 12.43],
    
    // P2 (Green) Base - Top-right
    600: [10.5, 1.58], 601: [12.54, 1.58], 602: [10.5, 3.45], 603: [12.54, 3.45],
    
    // P3 (Red) Base - Top-left
    700: [1.5, 1.58], 701: [3.57, 1.58], 702: [1.5, 3.45], 703: [3.57, 3.45],
    
    // P4 (Yellow) Base - Bottom-right
    800: [10.5, 10.58], 801: [12.54, 10.58], 802: [10.5, 12.43], 803: [12.54, 12.43],
};

export const STEP_LENGTH = 6.66; // Approximately 100% / 15 cells

export const PLAYERS = ['P1', 'P2', 'P3', 'P4']; // Four players

export const BASE_POSITIONS = {
    P1: [500, 501, 502, 503],
    P2: [600, 601, 602, 603],
    P3: [700, 701, 702, 703], // Base positions for P3
    P4: [800, 801, 802, 803], // Base positions for P4
}

export const START_POSITIONS = {
    P1: 0,
    P2: 13, // This should be 13 for P2 (Green)
    P3: 26, // This should be 26 for P3 (Red)
    P4: 39  // P4 starts at position 39
}

export const HOME_ENTRANCE = {
    P1: [100, 101, 102, 103, 104],
    P2: [200, 201, 202, 203, 204],
    P3: [300, 301, 302, 303, 304], // Home entrance for P3
    P4: [400, 401, 402, 403, 404]  // Home entrance for P4
}

export const HOME_POSITIONS = {
    P1: 105,
    P2: 205,
    P3: 305, // Final home for P3
    P4: 405  // Final home for P4
}

export const TURNING_POINTS = {
    P1: 50,
    P2: 12, // P2 turns at 12 to enter home path 200
    P3: 25, // P3 turns at 25 to enter home path 300
    P4: 38  // P4 turns at 38 to enter home path 400
}

// All safe positions on a 4-player Ludo board (start points + stars)
export const SAFE_POSITIONS = [
    0, 8, 13, 21, 26, 34, 39, 47, // Existing and new safe spots
    5, 18, 31, 44, // The 4 star positions (example, check your board)
];

export const STATE = {
    DICE_NOT_ROLLED: 'DICE_NOT_ROLLED',
    DICE_ROLLED: 'DICE_ROLLED',
}