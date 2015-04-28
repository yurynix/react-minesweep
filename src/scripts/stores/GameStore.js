/**
 * Created by Yury on 05/04/2015.
 */
'use strict';

var Store = require('./Store'),
    inherits = require('util').inherits,
    AppDispatcher = require('../dispatcher/MinesweepAppDispatcher'),
    Flags = require('../utils/Flags'),
    GameStatus = require('../constants/GameStatus'),
    BoardCellTypes = require('../constants/BoardCellTypes');


function GameStore(dispatcher) {
    GameStore.super_.apply(this, arguments); // call super
    this._state = {
        "settings": {
            "rows": 10,
            "columns": 10,
            "mines": 10
        },
        "board": [],
        "flagsCount": 0,
        "status": GameStatus.Playing
    };
}
inherits(GameStore, Store);

GameStore.prototype._dispatchedActionListener = function GameStore__dispatchedActionListener(action) {
    switch (action.actionType) {
        case "changeSetting":
            if (this._state.settings.hasOwnProperty(action.settingName)) {
                this._state.settings[action.settingName] = action.settingValue;
                this.emitChange();
            }
            break;

        case "newGame":
            this.createNewGame();
            break;

        case "toggleFlagCell":
            this.toggleFlagCell(action.row, action.col);
            break;

        case "revealCell":
            this.revealCell(action.row, action.col);
            break;

    }
};

GameStore.prototype._getAdjacentCells = function GameStore__getAdjacentCells(row, col) {
    var adjacentCells = [];

    if (row + 1 < this._state.settings.rows) {
        adjacentCells.push({
            row: row + 1,
            col: col
        });
    }

    if (row - 1 >= 0) {
        adjacentCells.push({
            row: row - 1,
            col: col
        });
    }

    if (col + 1 < this._state.settings.columns) {
        adjacentCells.push({
            row: row,
            col: col + 1
        });
    }


    if (col - 1 >= 0) {
        adjacentCells.push({
            row: row,
            col: col - 1
        });
    }


    if (col - 1 >= 0 && row - 1 >= 0) {
        adjacentCells.push({
            row: row - 1,
            col: col - 1
        });
    }

    if (col - 1 >= 0 && row + 1 < this._state.settings.rows) {
        adjacentCells.push({
            row: row + 1,
            col: col - 1
        });
    }

    if (row - 1 >= 0 && col + 1 < this._state.settings.columns) {
        adjacentCells.push({
            row: row - 1,
            col: col + 1
        });
    }


    if (col + 1 < this._state.settings.columns && row + 1 < this._state.settings.rows) {
        adjacentCells.push({
            row: row + 1,
            col: col + 1
        });
    }

    return adjacentCells;
};

GameStore.prototype._placeMines = function GameStore__placeMines() {
    var i,
        row,
        col,
        mines = [];

    for (i = 0; i < this._state.settings.mines; i++) {
        do {
            row = Math.floor(Math.random() * (this._state.settings.rows - 1));
            col = Math.floor(Math.random() * (this._state.settings.columns - 1));
        } while (this._state.board[row][col] !== BoardCellTypes.Empty); // ensure didn't hit occupied mine

        this._state.board[row][col] = BoardCellTypes.Mine;
        mines.push({row: row, col: col});
    }

    this._state.mines = mines;
};

GameStore.prototype._calculateMinesNearCell = function GameStore__calculateMinesNearCell() {
    var i,j, adjCells, minesCount;

    function sumMines(a, b) {
        return a + (this._state.board[b.row][b.col] === BoardCellTypes.Mine);
    }

    for (i = 0; i < this._state.settings.rows; i++) {
        for (j = 0; j < this._state.settings.columns; j++) {
            if (this._state.board[i][j] !== BoardCellTypes.Mine) { // can check here not bitwise because in init state
                adjCells = this._getAdjacentCells(i, j);
                minesCount = adjCells.reduce(sumMines.bind(this), 0);

                this._state.board[i][j] = minesCount;
            }
        }
    }
};

GameStore.prototype.createNewGame = function GameStore_createNewGame() {
    var i, j;

    // init the board
    this._state.board = new Array(this._state.settings.rows);
    for (i = 0; i < this._state.settings.rows; i++) {
        this._state.board[i] = new Array(this._state.settings.columns);
    }

    // initialize all to empty
    for (i = 0; i < this._state.settings.rows; i++) {
        for (j = 0; j < this._state.settings.columns; j++) {
            this._state.board[i][j] = BoardCellTypes.Empty;
        }
    }

    this._placeMines();
    this._calculateMinesNearCell();
    this._state.status = GameStatus.Playing;

    this.emitChange();
};

GameStore.prototype.isAllMinesFlagged = function GameStore_isAllMinesFlagged() {
    var i,
        mine;

    for (i = 0; i < this._state.mines.length; i++) {
        mine = this._state.mines[i];
        if (!Flags.hasFlag(this._state.board[mine.row][mine.col], BoardCellTypes.Flagged)) {
            return false;
        }
    }

    return true;
};

GameStore.prototype.toggleFlagCell = function GameStore_flagCell(row, col) {
    // if revealed, can't flag
    if (Flags.hasFlag(this._state.board[row][col], BoardCellTypes.Revealed)) {
        return;
    }

    if (!Flags.hasFlag(this._state.board[row][col], BoardCellTypes.Flagged)) {

        // enforce flags count
        if (this._state.flagsCount === this._state.settings.mines) {
            return;
        }

        this._state.board[row][col] = Flags.setFlag(this._state.board[row][col], BoardCellTypes.Flagged);
        this._state.flagsCount++;

        if (this._state.flagsCount === this._state.settings.mines) {
            if (this.isAllMinesFlagged()) {
                this._state.status = GameStatus.Won;
            }
        }

    } else {
        this._state.board[row][col] = Flags.removeFlag(this._state.board[row][col], BoardCellTypes.Flagged);
        this._state.flagsCount--;
    }

    this.emitChange();
};

GameStore.prototype._addrHasNoFlags = function GameStore__addrHasNoFlags(cell) {
    return !Flags.hasFlag(this._state.board[cell.row][cell.col], BoardCellTypes.Mine) && !Flags.hasFlag(this._state.board[cell.row][cell.col], BoardCellTypes.Revealed) && !Flags.hasFlag(this._state.board[cell.row][cell.col], BoardCellTypes.Flagged);
};

GameStore.prototype._addrNotEmpty = function GameStore__addrNotEmpty(cell) {
    return Flags.removeFlag(this._state.board[cell.row][cell.col], BoardCellTypes.Flagged | BoardCellTypes.Mine | BoardCellTypes.Revealed) === BoardCellTypes.Empty;
};

GameStore.prototype._revealAdjWithNoMines = function GameStore__revealAdjWithNoMines(row, col) {
    var adjCells = this._getAdjacentCells(row, col);

    // remove mines and already revealed, dont want to reveal those
    adjCells = adjCells.filter(this._addrHasNoFlags.bind(this));

    // reveal the rest
    adjCells.forEach(function(cell) {
        this._state.board[cell.row][cell.col] = Flags.setFlag(this._state.board[cell.row][cell.col], BoardCellTypes.Revealed);
    }.bind(this));

    // if the revealed cell is not empty, remove it from recursion
    adjCells = adjCells.filter(this._addrNotEmpty.bind(this));

    // continue recursion
    adjCells.forEach(function(cell) {
        this._revealAdjWithNoMines(cell.row, cell.col);
    }.bind(this));

};

GameStore.prototype.revealCell = function GameStore_revealCell(row, col) {
    if (Flags.hasFlag(this._state.board[row][col], BoardCellTypes.Revealed) || Flags.hasFlag(this._state.board[row][col], BoardCellTypes.Flagged)) {
        return;
    }

    if (Flags.hasFlag(this._state.board[row][col], BoardCellTypes.Mine)) {
        this._state.status = GameStatus.Lost;
    } else {
        this._state.board[row][col] = Flags.setFlag(this._state.board[row][col], BoardCellTypes.Revealed);
        if (this._state.board[row][col] === BoardCellTypes.Revealed) {
            this._revealAdjWithNoMines(row, col);
        }
    }


    this.emitChange();
};

module.exports = new GameStore(AppDispatcher);
