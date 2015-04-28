'use strict';

describe('GameBoardCell', function () {
  var React = require('react/addons');
  var GameBoardCell, component;

  beforeEach(function () {
    GameBoardCell = require('components/GameBoardCell.js');
    component = React.createElement(GameBoardCell);
  });

  it('should create a new instance of GameBoardCell', function () {
    expect(component).toBeDefined();
  });
});
