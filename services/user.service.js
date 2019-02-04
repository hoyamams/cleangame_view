app.service('$UserService', ['$http', 'ApiPath', function ($http, ApiPath) {

  
    //Mantem dados do usuario autenticado
    this.user = {}
  
    this.getUserData = function () {
        /**
         * Configura o cabeçalho
         */
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.get(ApiPath + '/users/mydata', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("ERRO: Falha ao obter informações do usuário...",err)
            return err;
        });
    }

    this.isLoged = function(){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.get(ApiPath + '/users/mydata', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            
            console.log("ERRO: Falha ao obter informações do usuário...",err)
            return err;
        });
    }

    this.login = function(login){
          return $http.post(ApiPath + '/login', login).then(function(response) {
            if(response.status == 200){
             localStorage.setItem("cleangameToken",response.headers('authorization'))    
             console.log("SUCESSO: login do usuário com sucesso...")                     
            }                      
            return response
        }).catch(function (err) {
            console.log("ERRO: Falha ao efetuar login do usuário...")
            return err;
        });
    }


    this.newUser = function(user){
       return $http.post(ApiPath + '/users/', user).then(function(response) {
         return response;        
      }).catch(function (err) {
          console.log("ERRO: Falha ao efetuar login do usuário...")
          return err;
      });
    }

    this.logout = function(login){
       localStorage.removeItem("cleangameToken");    
    }
   

    this.signAccount = function (user) {
        /*Realiza tratamento para manter compatibilidade
        com backend, verificar tratamentos e ajustes 
        nescessários*/

        if (user.pessoaFisica) {
            user.name = user.nomePFisica;
            user.cpfCnpj = user.cpf;
        }else{
            user.name = user.nomePJuridica;
            user.cpfCnpj = user.cnpj;
        }


        var config = {

        };

        return $http.post(ApiPath + '/user/register', user, config).then(function (response) {
            this.user = response.data;
            return response.data
        }).catch(function (err) {
            console.log("ERRO: Falha ao registrar usuário")
        });


    }
}])