'use strict';
var valuename = 'uiConstant';

module.exports = function(app) {
    app.value(app.name + '.' + valuename, {});
};