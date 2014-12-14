/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

ngAB.service('ABChoices', ['spec', ABChoices]);

function ABChoices(spec) {

    this.get = function() {
        return spec.map(function(test){
            return [test.name, test.cases[0].name];
        });
    };

    this.getString = function() {
        return this.get().map(function(choice) {
            return choice.join("=");
        }).join("&");
    };
}
