app.controller('SkeletonCtrl', function ($rootScope,$routeParams, $location, $scope, $UserService,$RoomService, $TeamService) {
  $rootScope.user = {};


  $rootScope.user.isLoged = false;
  
  $rootScope.msg = {};
  
  


  /*Funções de uso geral do sistema*/
  function getUser() {
    $UserService.getUserData().then(function (response) {
      /**Verifica se usuario esta logado */
      if (response.status == 200) {
        $rootScope.user = response.data;
        $rootScope.user.isLoged = true;
      } else {
       
      }
    })
  }


  $rootScope.openLoginToggle = function(){
    $('#dropdown-toggle-login').dropdown('toggle');
  }
  
  $rootScope.newUser = function(){
    $("#modalNewUser").modal('show');
  }

  $rootScope.linkshared = "link"
  $rootScope.newSharedRoom = function(){
    $("#modalSharedRoom").modal('show');
  }

  

  $rootScope.loadMainContent = function (template) {
    $rootScope.divmaincontent = './views/' + template + '.template.html';
  }

  
    
  $rootScope.logIn = function (login) {
      $UserService.login(login).then(function (data) {
        $UserService.getUserData().then(function (response) {
          if (response.status == 200) {
             getUser();
             $('.dropdown.open').removeClass('open');
             $rootScope.loadMainContent('rooms');
          }else{
            $rootScope.user.isLoged = false;
            $rootScope.msg.errorLogin = "Falha no login, tente novamente!";
            $rootScope.openLoginToggle()
          }
        })
      })
    }
  
    $rootScope.logOut = function (login) {
      $UserService.logout();
      location.reload();
    }
  
  
  
    
    
    
    getUser();
    
  //Se existir convite  
  if(typeof $routeParams.inviteid !== "undefined"){     
       if(localStorage.getItem("cleangameToken") ){
          console.log("Usuário Logado: ");
          $TeamService.getRoom($routeParams.inviteid).then(function (room) {
              console.log("CARREGANDO DADADOS SALA REFERENTE AO CONVITE", room)

              //Adicionar usuário ao team 

              //Carrega a sala do convite...(multiplayer)
              $RoomService.setActiveRoom(room);
              team={id:$routeParams.inviteid}
              $TeamService.setActiveTeam(team);
              
              $rootScope.invited = true;
              $rootScope.loadMainContent("rooms");
          })          /*
          * Consulta a sala referente ao convite
          * O id do convite é o id do team
          */



          //Direciona para a sala correta
    

       }else{
          console.log("Usuário não Logado: ");
          $rootScope.loadMainContent('new-user');

       }

      //CARREGAMENTO PADRÃO;  
  }else{

  /**Uso jquery compatibilidade com bootstrap */
 
  

  







  $rootScope.loadMainContent('home');



  //Carregamento padrão
  //$rootScope.loadTemplate('./views/productsList.template.html');


  //renewNavs();
  // $rootScope.activetab = $location.path();
  }//FECHA CARRAGAMENTO PADRAO

});


