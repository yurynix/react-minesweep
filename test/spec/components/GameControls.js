'use strict';

describe('GameControls', function () {
  var React = require('react/addons');
  var GameControls, component;

  beforeEach(function () {
    GameControls = require('components/GameControls.js');
    component = React.createElement(GameControls);
  });

  it('should create a new instance of GameControls', function () {
    expect(component).toBeDefined();
  });
});
