'use strict';

var React = require('react/addons'),
    GameActions = require('../actions/GameActions');

require('styles/GameControls.scss');

var GameControls = React.createClass({
    _settingsValueChanged: function GameControls__settingsValueChanged(settingName, event) {
        GameActions.changeSetting(settingName, event.target.value);
    },
    _newGameClick: function GameControls__newGameClick() {
        GameActions.newGame();
    },
    render: function GameControls_render() {
        var self = this;
        return (
            <div className="gameControls">
                <h2>Settings</h2>
                {Object.keys(self.props.settings).map(function (settingName) {
                    return (
                        <div>
                            <label>{settingName}:</label>
                            <input type="text" value={self.props.settings[settingName]} onChange={self._settingsValueChanged.bind(self, settingName)} />
                        </div>
                    );
                })}
                <button onClick={self._newGameClick}>New Game!</button>
            </div>
          );
    }
});

module.exports = GameControls;

