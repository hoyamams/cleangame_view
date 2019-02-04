app.service('$TeamService', ['$http', 'ApiPath', function ($http, ApiPath) {

    team = {};
  
    this.setActiveTeam = function(team){
        this.team = team;
    }

    this.getActiveTeam = function(){
       return this.team;
    }

    this.getRoom = function(invited){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }
        return $http.get(ApiPath + '/team/getroom/'+invited, config).then(function (response) {
            return response.data;                         
        }).catch(function (err) {
            console.log("Falha ao consultar room referente ao convite...")
            return err;
        });
    }

    this.restart = function(){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }
        return $http.get(ApiPath + '/rooms/'+this.getActiveRoom().id+'/restart', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("Falha ao consultar dica...")
            return err;
        });
    }


    this.findRooms = function(keyword){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.get(ApiPath + '/rooms/search?keyword='+keyword, config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("Falha ao consultar salas...")
            return err;
        });
    }

    this.roomSubscribe = function(room){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.post(ApiPath + '/users/room/subscribe/'+room.id, null, config).then(function(response) {
            console.log(response)                            
            return response
        }).catch(function (err) {
            console.log("ERRO: Falha ao criar sala...")
            return err;
        });
    }

    this.getUserRoomsAdmin = function () {
        /**
         * Configura o cabeçalho
         */
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.get(ApiPath + '/users/rooms/admin', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("ERRO: Falha ao obter salas administradas pelo usuario...")
            return err;
        });
    }

    this.getUserRoomsMember = function () {
        /**
         * Configura o cabeçalho
         */
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.get(ApiPath + '/users/rooms/member', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("ERRO: Falha ao obter salas do usuario...")
            return err;
        });
    }


    this.getQuestion = function () {
        /**
         * Configura o cabeçalho
         */
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.get(ApiPath + '/rooms/'+this.getActiveRoom().id+'/loadquestion', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("ERRO: Falha ao obter questão...",err)
            return err;
        });
    }


    this.insertNewRoom = function(room){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.post(ApiPath + '/rooms/', room, config).then(function(response) {
                  
             console.log("room")                     
                                  
            return response
        }).catch(function (err) {
            console.log("ERRO: Falha ao criar sala...")
            return err;
        });
    }

    this.delete = function(room){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.post(ApiPath + '/rooms/delete/'+room.id,null,config).then(function(response) {
            console.log(response)                     
                                  
            return response
        }).catch(function (err) {
            console.log("ERRO: Falha ao efetuar login do usuário...",err)
            return err;
        });
    }


    this.createMultiplayer = function(team){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.post(ApiPath + '/rooms/multiplayer/'+this.getActiveRoom().id,team,config).then(function(response) {
            console.log(response)                     
                                  
            return response
        }).catch(function (err) {
            console.log("ERRO: Falha ao criar team...",err)
            return err;
        });
    }


   

   
}])