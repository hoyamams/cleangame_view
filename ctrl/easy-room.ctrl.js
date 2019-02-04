app.controller('EasyRoomCtrl', function ($rootScope,Domain,$sce, $location, $scope,$RoomService, $EasyRoomService, $QuestionService, $SocketService, $TeamService) {
  
  



  label = {};
  label.newEasyRoomTitle = "New easy room";
  label.nameRoom = "Room name";
  label.descriptionRoom = "Room description";
  label.isPublicRoom = "Is public room?";
  label.btnCreateRoom = "Create!";
  label.newQuestion = "New Question"
  label.correctAlternative = "Correct alternative";
  label.fakeAlternative = "Fake alternative";
  label.btnInsertQuestion = "Insert question!"

  $scope.leader = {};

  $scope.label = label;

  $scope.step1 = true;
  $scope.step2 = false;

  $scope.question = {};
  $scope.questions = {};

  $scope.sendMsg = "";
  $scope.consoleChat = '...';


  console.log("DADOS DA SALA", $RoomService.getActiveRoom());

  //Corrigir
  $scope.room = $RoomService.getActiveRoom();
  
  
  

  //Função ativa modo multiplayer na sala
  function multiplayer(){
    //Funções socketio
    //conecta usuário servidor
  $SocketService.conect();

  //Registra usuário na sala
  $SocketService.registerUser($rootScope.user);
  $SocketService.registerUserRoom($TeamService.getActiveTeam().id);
 
  
  


  //Inicia captura da posição do mouse e envia servidor socket
  window.addEventListener('mousemove', function(e) {
    var mouse = {
        page: {
            x: e.pageX,
            y: e.pageY
        },
        client: {
            x: e.clientX,
            y: e.clientY
        }
    };

    $SocketService.moveMouse(mouse);

    //console.log("POSICAO MOUSE",);
    //var screenWidth = screen.width;
    //var screenHeight = screen.height;    
  })


  usuarios = [];
  count_user_remot = 0;
  //Obtem posição mouse demais participantes da sala.
  $SocketService.socket.on("movereceiver", function(moviment) {    	
    //msgobj = JSON.parse(msg);
    //console.log("RECEBENDO MOVIMENTAÇÂO", moviment); 
    
    if(usuarios.indexOf(moviment.user) > -1){

    }else{
      if(moviment.user != $rootScope.user.mail){
        count_user_remot++;
        $("#userremoto"+count_user_remot).html("."+moviment.user);
        $("#userremoto"+count_user_remot).show()
        usuarios[count_user_remot++] = moviment.user
       // console.log("NOVO USUARIO NA SALA",moviment.user);
       }
    }
    
    if(moviment.user != $rootScope.user.mail)
      $("#userremoto"+usuarios.indexOf(moviment.user)).css({top: (($(window).height()/300)*moviment.y), left: (($(window).width()/300)*moviment.x), position:'absolute'});
  

    });

  
  //array usuários logados na sala
 
  $SocketService.socket.on("sendchatmsg", function(mensagem){
    console.log("RECEBEU MSG")
    $scope.consoleChat = $sce.trustAsHtml($scope.consoleChat+"<br>");
    $scope.consoleChat = $sce.trustAsHtml($scope.consoleChat +"<b>"+ mensagem.usermail+":</b>");
    $scope.consoleChat = $sce.trustAsHtml($scope.consoleChat + mensagem.text);
    //$sce.trustAsHtml($scope.html)
  })

  $SocketService.socket.on("new_user_in_room", function(usermail) {    	
   /*
    if(usermail != $rootScope.user.mail){
     count_user_remot++;
     $("#userremoto"+count_user_remot).html("."+usermail);
     $("#userremoto"+count_user_remot).show()
     usuarios[count_user_remot++] = usermail
     console.log("NOVO USUARIO NA SALA",usermail);
    }
    */
  });

  /**RECEBE NOTIFICAÇÂO DE ALTERNATIVA */
  $SocketService.socket.on("makealternative", function(msg) { 
    loadQuestion();    
   
    
  })  	

  $SocketService.socket.on("gettip", function(msg) { 
    console.log("RECEBENDO DICA!!", msg)    
    $scope.tip = msg.tip;    
  })  	



}

  //verifica se ativa modo (DESABILITADO)
  if($RoomService.getActiveRoom().multiplayer){  
     
  }



  $scope.panel = {}
  $scope.panel.time = 0;
  

  function loadResume(){
    $RoomService.getResume().then(function(response){
      $scope.resume = response.data;     
    })
  }

  function loadQuestion(){  
    loadResume();
    $scope.tip = null;
    $scope.panel.time = 0;  
    $EasyRoomService.getQuestion().then(function(response){
       if(response.data.id != null){
         $scope.question = response.data;         
       }else{
         $rootScope.loadMainContent('rooms/easy/congratulations')
       }       
       console.log($scope.question)
    })
  }

  function loadQuestionSocket(){            
      
    loadResume();
    $scope.tip = null;
    $scope.panel.time = 0;  
    $EasyRoomService.getQuestion().then(function(response){
       if(response.data.id != null){
         $scope.question = response.data;         
       }else{
         $rootScope.loadMainContent('rooms/easy/congratulations')
       }       
       $SocketService.makeAlternative();
       console.log($scope.question)
    })
  }

  

  function moveStep1(){
    $scope.step2 = false;
    $scope.step1 = true;
    getQuestions();
  }

  function moveStep2(){
    $scope.step2 = true;
    $scope.step1 = false;
    getQuestions();
  }
 

  function getQuestions(){
    $EasyRoomService.getQuestions().then(function(response){
      $scope.questions = response.data;
    })
  }


  $scope.getTip = function(){
    $QuestionService.getTip($scope.question.id).then(function(response){
      $scope.tip = response.data.tip
      $SocketService.getTip(response.data.tip)
    })
  }

  $scope.skip = function(){
    $QuestionService.skip($scope.question.id).then(function(response){      
      loadQuestionSocket();
    })
  }

  $scope.restart = function(){
    //$RoomService.restart().then(function(response){
    room = $RoomService.getActiveRoom();  
    $RoomService.createTeam().then(function(response){
      
        $RoomService.setActiveRoom(room);
        $TeamService.setActiveTeam(response.data);
  
        if(room.type == "EASY"){
          $rootScope.loadMainContent('rooms/easy/room');
        }else{
          $rootScope.loadMainContent('rooms/medium/medium-room');
        }
      })
      //$rootScope.loadMainContent('rooms/easy/room')
   // })
  }


  $scope.markAlternative = function(option){
     alternative = {};
     alternative.question = $scope.question.id;
     alternative.answer = $scope.question.answer;     
     alternative.md5answer = md5($scope.question.alternatives[option]);

     $QuestionService.markAlternative(alternative).then(function(response){
       alternative = response.data;
       loadQuestionSocket()             
       
     })
  }

  $scope.moveQuestionsTab = function(){
    if($scope.room.id != null){
      moveStep2()
    }
  }

  $scope.moveRoomTab = function(){
    if($scope.room.id != null){
      moveStep1()
    }
  }


  $scope.createRoom = function(room){
    room.type = "EASY"
    $EasyRoomService.insertNewRoom(room).then(function(response){
      if(response.status==201){
        $EasyRoomService.setActiveRoom(response.data)
        moveStep2();
      }      
    })
  }

  $scope.insertQuestion = function(question){
    question.md5correct = md5(question.correct);
    $EasyRoomService.insertQuestion(question).then(function(response){
       $scope.question = angular.copy($scope.leader); 
       getQuestions()      
    })
  }

  $scope.editQuestion = function(question){
    $scope.question = question;
  }

  $scope.sharedLink = function(){
    $rootScope.linkshared = Domain + "/invite/"+$TeamService.getActiveTeam().id;
    $("#modalSharedRoom").modal('show');
  }

  $scope.sendChatMensage = function(msg){
    $SocketService.sendChatMessage(msg);
    
    $scope.consoleChat = $sce.trustAsHtml($scope.consoleChat+"<br>");
    $scope.consoleChat = $sce.trustAsHtml($scope.consoleChat +"<b>"+ $scope.user.mail+":</b>");
    $scope.consoleChat = $sce.trustAsHtml($scope.consoleChat + msg);
    $scope.sendMsg = "";
  }



  


  if( $rootScope.createRoom){
    
    $rootScope.createRoom = false;
  }else{
  
    $EasyRoomService.setActiveRoom($RoomService.getActiveRoom());

    setInterval(function(){
      $scope.$apply(function () {
        $scope.panel.time++;
        if($scope.panel.time == 40){
          $scope.getTip();
        }
        if($scope.panel.time == 80){
          $scope.getTip();
        }
  
  
    });
     
    },1000)  

    multiplayer();

    loadQuestion();
    loadResume();

    
  }
  

  //Carregamento padrão
  //$rootScope.loadTemplate('./views/productsList.template.html');


  //renewNavs();
  // $rootScope.activetab = $location.path();
});

