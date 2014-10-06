/**
 * Created by Stuart on 10/1/14.
 */

angular.module('ngAB', [])
    .value('spec', {})
    .service('ABChoices', [
                'spec',
        function(spec) {
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
    ])
    .factory('ABInterceptor', [
                'spec','ABChoices',
        function(spec,  ABChoices) {
            // Construct file modification chain spec in form:
            // {'filename': [{change}, {change}, ...], ...}
            var path_mods = spec.reduce(function(pmods, test) {
                // For test in spec, chain changes
                function add_changes(change) {
                    pmods[change.file] = (pmods[change.file] || [])
                        .concat([change]);
                }
                (test['cases'][0]['changes'] || []).map(add_changes);
                return pmods;
            }, {});

            return {
                response: function(response) {
                    var mods = path_mods[response.config.url];
                    if (!mods) {
                        // No test spec for this path
                        return response;
                    }

                    function applyChange(data, change) {
                        data += change.append || '';
                        if (change.css) {
                            data += '<style>' + change.css + '</style>'
                        }
                        if (change.find && change.replace) {
                            data = data.replace(new RegExp(change.find,
                                change.flags), change.replace)
                        }
                        return data;
                    }

                    response.data = mods.reduce(applyChange, response.data);
                    return response;
                }
            }
        }
    ]).config([
        '$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push('ABInterceptor');
        }
    ]);