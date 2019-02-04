app.controller('UserCtrl', function ($rootScope, $location, $scope,$UserService) {
    
    console.log("UserCtrl load");
    

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

    $scope.newUserInsert = function(user){
      console.log("User", user)
      $UserService.newUser(user).then(function(response){
        if(response.status == 201){
         login = {
           mail:user.mail,
           passwd:user.passwd
         }
          $UserService.login(login).then(function(response){
            //Carrega dados do usuário cadastrado
            getUser();
            /**Fecha modal */
            $("#modalNewUser").modal('hide');

            $rootScope.loadMainContent('rooms');

           
          })
        }
      })
    }
  
    /**
     * Funções controle da pagina
     */
    function attScreen(){

    }


});
  
  