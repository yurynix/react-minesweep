'use strict';

var React = require('react/addons'),
    GameActions = require('../actions/GameActions'),
    BoardCellTypes = require('../constants/BoardCellTypes'),
    Flags = require('../utils/Flags');

require('styles/GameBoardCell.scss');

var GameBoardCell = React.createClass({
    _cellClick: function GameBoardCell__cellClick(event) {
        if (this.props.disabled) {
            return;
        }
        GameActions.revealCell(this.props.row, this.props.col);
    },
    _cellRightClick: function GameBoardCell__cellRightClick(event) {
        if (this.props.disabled) {
            return;
        }
        event.preventDefault();
        GameActions.toggleFlagCell(this.props.row, this.props.col);
    },
    render: function () {
        var self = this;
        return (
            <div key={"cell" + self.props.row + "_" + self.props.col} className="cell" onClick={self._cellClick} onContextMenu={self._cellRightClick}>
                {Flags.hasFlag(self.props.value, BoardCellTypes.Revealed) ? Flags.removeFlag(self.props.value, BoardCellTypes.Revealed) : ""}
                {Flags.hasFlag(self.props.value, BoardCellTypes.Flagged) ? "V" : ""}
            </div>
        );
    }
});

module.exports = GameBoardCell;

