'use strict';

describe('GameBoard', function () {
  var React = require('react/addons');
  var GameBoard, component;

  beforeEach(function () {
    GameBoard = require('components/GameBoard.js');
    component = React.createElement(GameBoard);
  });

  it('should create a new instance of GameBoard', function () {
    expect(component).toBeDefined();
  });
});
