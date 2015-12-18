'use strict';

module.exports = function(app) {
    // inject:start
    require('./ui_controller.controller')(app);
    require('./ui_filter.controller')(app);
    // inject:end
};