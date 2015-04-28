/**
 * Created by Yury on 05/04/2015.
 */
'use strict';
module.exports = {
    hasFlag: function hasFlag(value, flag) {
        return value & flag;
    },
    setFlag: function setFlag(value, flag) {
        return value | flag;
    },
    removeFlag: function removeFlag(value, flag) {
        return value & ~flag;
    }
};
