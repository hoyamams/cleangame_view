var app = angular.module('cleangame', ['ngRoute']);

local = false;

if(local){
  app.constant('ApiPath', "http://localhost:8080");
  app.constant('SocketServer', "http://localhost");
  app.constant('SocketPort', "2000");
  app.constant('Domain', "localhost");

}else{
  app.constant('ApiPath', "http://ec2-52-67-255-100.sa-east-1.compute.amazonaws.com:8080");
  app.constant('SocketServer', "http://ec2-52-67-255-100.sa-east-1.compute.amazonaws.com");
  app.constant('SocketPort', "8081");
  app.constant('Domain', "http://ec2-52-67-255-100.sa-east-1.compute.amazonaws.com");


}

//app.constant('ApiPath', "http://10.42.0.147:8080");
//app.constant('ApiPath', "http://177.105.44.236:8080");

//app.constant('ApiPath', "http://localhost:8080");



//app.constant('SocketServer', "http://localhost");


//app.constant('SocketPort', "2000");




//app.constant('Domain', "localhost");




app.config(function ($routeProvider, $locationProvider) {
  // remove o # da url

  $locationProvider.html5Mode(true);

  $routeProvider
    // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
    .when('/', {
      templateUrl: './views/skeleton.template.html',
      controller: 'SkeletonCtrl',
    })
    .when('/invite/:inviteid', {
      templateUrl: './views/skeleton.template.html',
      controller: 'SkeletonCtrl',
    })
    // caso não seja nenhum desses, redirecione para a rota '/'
    .otherwise({ redirectTo: '/' });


   

});


$(document).keydown(function(e){
  if(e.keyCode == 13) {
      $('#send').click();
  }
});

