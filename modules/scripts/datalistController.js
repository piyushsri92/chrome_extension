    /**
     * @ngdoc controller
     * @requires $scope
     * @requires performActionService
     * @description
     * datalistCtrl act as a main controller to display quotes on daily basis at 10:00 a.m and also on a click of extension. 
    */

var myApp=angular.module('datalist.controller',[]);

myApp.controller('datalistCtrl', ['$scope','performActionService', function($scope, performActionService) {

var promise=performActionService.getData();

var flag=true;

//calling getAlert() on each 1 sec to reload it.
window.setInterval($scope.init = function () {
      $scope.getAlert();     
 },1000);

$scope.getAlert = function(){
    var time = /(..)(:..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hr= time[1];                 // will take the hr(IST)
    var hour = time[1] % 12 || 12;   // The prettyprinted hour
    var min = time[2];              //will take the min(IST)
    var sec = time[3];              //will take the sec(IST)                 
    var period = time[1] < 12 ? 'a.m' : 'p.m';   // The period of the day.

   //fetching response from server using service
    promise.then(function(response){
        //success
        $scope.data=response.data.contents.quotes;
        console.log($scope.data);  
    }, 
    function(err){
                    //error
                    alert("something wrong happened");
             })

    //checking condition if time is 10:00:00 
    if(hr=="10" && min==":00" && sec==":00"){
         if(flag){
            new Notification(hour + time[2] + ' ' + period, 
             {
                  icon: 'icon.png',
                  body:  $scope.data[0].quote
            });
            flag=false;
        }
    }   
    else{
          $scope.quote=$scope.data[0].quote;
          flag=true; // set flag true agains
    }
}
}]);