app.service('$RoomService', ['$http', 'ApiPath','$TeamService', function ($http, ApiPath,$TeamService) {

  
    //Mantem dados do usuario autenticado
    this.room = {}
    
    this.setActiveRoom = function(room){
        this.room = room;
    }

    this.getActiveRoom = function(room){
       return this.room;
    }

    this.getResume = function(){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }
        return $http.get(ApiPath + '/rooms/'+$TeamService.getActiveTeam().id+'/resume', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("Falha ao consultar resumo...")
            return err;
        });
    }

    this.getResumeBkp = function(){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }
        return $http.get(ApiPath + '/rooms/'+this.getActiveRoom().id+'/resume', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("Falha ao consultar resumo...")
            return err;
        });
    }


    this.restart = function(){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }
        return $http.get(ApiPath + '/rooms/'+$TeamService.getActiveTeam().id+'/restart', config).then(function (response) {
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

    /**Especie de seção */
    this.createTeam = function(){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        /**Implementação Futura */
        team = {};
        team.name = "";

        return $http.post(ApiPath + '/rooms/createteam/'+this.getActiveRoom().id,team,config).then(function(response) {
            console.log(response)                     
                                  
            return response
        }).catch(function (err) {
            console.log("ERRO: Falha ao criar team...",err)
            return err;
        });
    }


   

   
}])