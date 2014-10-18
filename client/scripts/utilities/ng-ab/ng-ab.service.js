/**
 * Created by Stuart on 10/16/14.
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
