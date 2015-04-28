'use strict';

describe('Board', function () {
  var React = require('react/addons');
  var Board, component;

  beforeEach(function () {
    Board = require('components/Board.js');
    component = React.createElement(Board);
  });

  it('should create a new instance of Board', function () {
    expect(component).toBeDefined();
  });
});
