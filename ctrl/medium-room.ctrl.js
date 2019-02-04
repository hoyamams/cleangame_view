app.controller('MediumRoomCtrl', function ($rootScope, $location, $interval, $scope,$RoomService, $MediumRoomService) {
 

  label = {};
  label.newEasyRoomTitle = "New medium room";
  label.nameRoom = "Room name";
  label.descriptionRoom = "Room description";
  label.isPublicRoom = "Is public room?";
  label.btnCreateRoom = "Create!";
  label.git = "Git clone:"

  $scope.leader = {};

  $scope.label = label;

  $scope.step1 = true;
  $scope.step2 = false;

  $scope.question = {};
  $scope.questions = {};


  $scope.panel = {}
  $scope.panel.time = 0;

  //Corrigir
  $scope.room = $RoomService.getActiveRoom();
  $MediumRoomService.setActiveRoom($RoomService.getActiveRoom());

  function loadResume(){
    $RoomService.getResume().then(function(response){
      $scope.resume = response.data;     
    })
  }

  function loadQuestion(){  
    loadResume();
    $scope.tip = null;
    $scope.panel.time = 0;  
    $MediumRoomService.getQuestion().then(function(response){
       if(response.data.id != null){
        $scope.question = response.data;
        htmlObject = $("<pre  class = \" brush: java \" >" + response.data.code +"</pre>")
       $("#sourcecode").html(htmlObject)
       $('.code').each(function () {
         SyntaxHighlighter.All();
       });

       SyntaxHighlighter.highlight();
        //$scope.sourcecode = response.data.code
        //SyntaxHighlighter.All();
       }else{
         //$rootScope.loadMainContent('rooms/easy/congratulations')
       }
       
       console.log("QUESTION",$scope.question)
    })
  }

  loadQuestion();

 
  getStatus = function(){
    $MediumRoomService.getStatus().then(function(response){
       $scope.cloneStatus = response.data.cloneStatus;
       $scope.pmdStatus = response.data.pmdStatus;
       $scope.makeQuestionStatus = response.data.makeQuestionStatus
       if(response.data.cloneStatus == "COMPLETED"
           && response.data.pmdStatus == "COMPLETED" 
            && response.data.makeQuestionStatus == "COMPLETED"){
           $interval.cancel(stop)
       }
    });
  }

  function moveStep2(){
    $scope.step2 = true;
    $scope.step1 = false;
    stop = $interval(getStatus, 3000)
    //setInterval(getStatus(), 3000);
  }
 
  $scope.createRoom = function(room){
    room.type = "MEDIUM"
    $MediumRoomService.insertNewRoom(room).then(function(response){
      if(response.status==201){
        $MediumRoomService.setActiveRoom(response.data)
        moveStep2();
      }      
    })
  }

  



  //Carregamento padrão
  //$rootScope.loadTemplate('./views/productsList.template.html');


  //renewNavs();
  // $rootScope.activetab = $location.path();
});

