'use strict';

module.exports = function(app) {
    // inject:start
    require('./ui_provider.service')(app);
    require('./ui_service.service')(app);
    // inject:end
};