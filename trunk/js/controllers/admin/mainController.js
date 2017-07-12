angular.module('admin',['ui.sortable']).controller('MainController', ['$rootScope', MainController]);

function MainController($rootScope) {
    var vm = this;

    if (!$rootScope.permissionSet && localStorage["permissionsSet"]) {
        $rootScope.permissionSet = JSON.parse(localStorage["permissionsSet"]);
    }

    Array.prototype.in_array = function (e) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == e)
                return true;
        }
        return false;
    };


}
