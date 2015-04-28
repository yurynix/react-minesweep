'use strict';

var React = require('react/addons'),
    GameBoardCell = require('./GameBoardCell');

require('styles/GameBoard.scss');

var GameBoard = React.createClass({
    render: function GameBoard_render() {
        var self = this,
            rowIdx = -1,
            colIdx = -1;

        return (
            <div className={"gameBoard " + (self.props.disabled ? "disabled" : "")}>
                <h2>Flags remaining: {self.props.flagsRemaining}</h2>
                {self.props.board.map(function (row) {
                    rowIdx++;
                    colIdx = -1;

                    return (
                         <div key={"row_" + rowIdx} className="row">
                             {row.map(function (cellValue) {
                                 colIdx++;
                                 return (
                                     <GameBoardCell row={rowIdx} col={colIdx} value={cellValue} disabled={self.props.disabled}></GameBoardCell>
                                 );
                             })}
                         </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = GameBoard;

