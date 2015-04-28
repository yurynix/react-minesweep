/**
 * Created by Yury on 05/04/2015.
 */
'use strict';

var AppDispatcher = require('../dispatcher/MinesweepAppDispatcher');

var GameActions = {
    changeSetting: function GameActions_play(settingName, settingValue) {
        AppDispatcher.dispatch({
            actionType: "changeSetting",
            settingName: settingName,
            settingValue: settingValue
        });
    },
    newGame: function GameActions_newGame() {
        AppDispatcher.dispatch({
            actionType: "newGame"
        });
    },
    toggleFlagCell: function GameActions_flagCell(row, col) {
        AppDispatcher.dispatch({
            actionType: "toggleFlagCell",
            row: row,
            col: col
        });
    },
    revealCell: function GameActions_revealCell(row, col) {
        AppDispatcher.dispatch({
            actionType: "revealCell",
            row: row,
            col: col
        });
    }

};


module.exports = GameActions;
