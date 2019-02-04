app.controller('RoomCtrl', function ($rootScope, $location, $scope, $RoomService, $SocketService) {
  console.log("Room Ctrl",$RoomService.getActiveRoom())
  
  
  


  $scope.activeRoom = $RoomService.getActiveRoom();

  label = {};
  label.name = "Nome";
  label.cancel = "Cancelar";
  label.description = "Descrição";
  label.descriptionHelp = "Faça uma pequena descrição da sala...";
  label.gitUrl = "Informe um repositório github";
  label.roomPublic = "A sala é publica?(Permite a participação de qualquer usuário!)";
  label.newRoom = "Nova sala";
  label.saveNewRoom = "Cadastrar";

  $scope.label = label;

 

  SyntaxHighlighter.highlight();

  $scope.roomsAdministrator = {};
  $scope.roomsMember = {}


  $RoomService.getQuestion().then(function(response){
    console.log("RESPONSE QUESTION",response);
    
    $scope.question = response.data[0];
    console.log($scope.question)
    //Usa jQuery para carregar SystaxHighLighter
    $('#sourcecode').html(response.data[0].code)
    SyntaxHighlighter.highlight();
  })
  

  function getUserRoomsAdmin() {
    $RoomService.getUserRoomsAdmin().then(function (response) {
      $scope.roomsAdministrator = response.data;
    })
  }

  function getUserRoomsMember() {
    $RoomService.getUserRoomsMember().then(function (response) {
      $scope.roomsMember = response.data;
    })
  }


  getUserRoomsAdmin();
  getUserRoomsMember()

  $scope.openViewNewRoom = function () {
    $("#modalNewRoom").modal('show');
  }

  $scope.insertNewRoom = function (room) {
    $RoomService.insertNewRoom(room).then(function (response) {
      if (response.status == 201) {
        $("#modalNewRoom").modal('hide');
        getUserRoomsAdmin();
      }
    })
  }

  $scope.deleteRoom = function(room){
    $RoomService.delete(room).then(function (response) {
      getUserRoomsAdmin();
    })
  }


  $scope.accessRoom = function(room){
    $RoomService.setActiveRoom(room);
    $rootScope.loadMainContent(room.type+'-room');
  }




  //Carregamento padrão
  //$rootScope.loadTemplate('./views/productsList.template.html');


  //renewNavs();
  // $rootScope.activetab = $location.path();
});

