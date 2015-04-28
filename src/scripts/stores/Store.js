/**
 * Created by Yury on 05/04/2015.
 */
'use strict';

var EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits;

function Store(dispatcher) {
    this._dispatcher = dispatcher;
    this._dispatchToken = this._dispatcher.register(this._dispatchedActionListener.bind(this));
}
inherits(Store, EventEmitter);

Store.prototype.getState = function Store_getState() {
    return this._state;
};

Store.prototype.emitChange = function Store_emitChange() {
    this.emit("change");
};

Store.prototype.addChangeListener = function Store_addChangeListener(listenFn) {
    this.on("change", listenFn);
};

Store.prototype.removeChangeListener = function Store_removeChangeListener(listenFn) {
    this.remove("change", listenFn);
};


module.exports = Store;
