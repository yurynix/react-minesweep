'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var MinesweepApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MinesweepApp = require('components/MinesweepApp.js');
    component = React.createElement(MinesweepApp);
  });

  it('should create a new instance of MinesweepApp', function () {
    expect(component).toBeDefined();
  });
});
