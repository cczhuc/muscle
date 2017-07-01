'use strict';

angular.module('admin').directive('recordValidator',
    ['$http', 'teacherService', function($http, teacherService) {

        return {
            require : 'ngModel',
            link : function(scope, element, attrs, ngModel) {
                var account = attrs.recordValidator;

                function setAsLoading(bool) {
                    ngModel.$setValidity('recordLoading', !bool);
                }

                function setAsAvailable(bool) {
                    ngModel.$setValidity('recordAvailable', bool);
                }

                ngModel.$parsers.push(function(value) {
                    if(!value || value.length == 0) return;

                    setAsLoading(true);
                    setAsAvailable(false);

                    teacherService.account(value).success(function(res) {
                        if (res.data.id == "") {
                            setAsLoading(false);
                            setAsAvailable(true);
                        } else {
                            setAsLoading(false);
                            setAsAvailable(false);
                        }
                    }).error(function() {

                    });

                    return value;
                })
            }
        }
    }]);