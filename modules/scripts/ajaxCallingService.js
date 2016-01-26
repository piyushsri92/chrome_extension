 var myApp = angular.module('shared.services', []);  
    myApp.service('performActionService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
 
var deferred = $q.defer();

$http.get('http://quotes.rest/qod.json').then(function (response)
{
 deferred.resolve(response);   
});

this.getData=function(){
    
    return deferred.promise;
}

}]);  