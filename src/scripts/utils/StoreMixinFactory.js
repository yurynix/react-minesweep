/**
 * Created by Yury on 05/04/2015.
 */
'use strict';

function getStateFromStores(stores) {
    var state = {};

    stores.forEach(function (store) {
        var stateKey = store.constructor.name.replace('Store', '').toLocaleLowerCase();
        state[stateKey] = store.getState();
    });

    return state;
}

function StoreMixinFactory() {
    var stores = Array.prototype.slice.apply(arguments);


    if (stores.length === 0) {
        throw new Error("Should pass at least one store!");
    }

    return {
        getInitialState: function StoreMixin_getInitialState() {
            return getStateFromStores(stores);
        },
        componentDidMount: function StoreMixin_componentDidMount() {
            var self = this;
            stores.forEach(function (store) {
                store.addChangeListener(self._onChange);
            });
        },
        componentWillUnmount: function StoreMixin_componentWillUnmount() {
            var self = this;
            stores.forEach(function (store) {
                store.removeChangeListener(self._onChange);
            });
        },
        _onChange: function StoreMixin__onChange() {
            this.setState(getStateFromStores(stores));
        }
    };
}

module.exports = StoreMixinFactory;
