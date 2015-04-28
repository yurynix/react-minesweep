'use strict';

var React = require('react/addons'),
    GameControls = require('./GameControls'),
    StoreMixinFactory = require('../utils/StoreMixinFactory'),
    GameStore = require('../stores/GameStore'),
    GameBoard = require('./GameBoard'),
    GameActions = require('../actions/GameActions'),
    GameStatus = require('../constants/GameStatus');

// CSS
require('normalize.css');
require('../../styles/main.css');

var MinesweepApp = React.createClass({
    mixins: [StoreMixinFactory(GameStore)],
    componentWillMount: function MinesweepApp_componentWillMount() {
        GameActions.newGame();
    },
    render: function() {
        var self = this,
            flagsRemaining = self.state.game.settings.mines - self.state.game.flagsCount;
        return (
          <div className='main'>
              <GameControls settings={self.state.game.settings}></GameControls>
              <h3 className="gameStatus">{self.state.game.status !== GameStatus.Playing ? (self.state.game.status === GameStatus.Lost ? "You lost" : "You won" ) : "Playing..."}</h3>
              <h3 className="flagsAlert">{flagsRemaining === 0 ? "Remove flags before adding new ones!" : ""}</h3>
              <GameBoard board={self.state.game.board} flagsRemaining={flagsRemaining} disabled={self.state.game.status !== GameStatus.Playing}></GameBoard>
          </div>
        );
    }
});
React.render(<MinesweepApp />, document.getElementById('content')); // jshint ignore:line

module.exports = MinesweepApp;
