app.service('$EasyRoomService', ['$http', 'ApiPath','$TeamService','$sce', function ($http, ApiPath, $TeamService,$sce) {

  
    //Mantem dados do usuario autenticado
    this.room = {}
    
    this.setActiveRoom = function(room){
        this.room = room;
    }

    this.getActiveRoom = function(room){
       return this.room;
    }



    this.getQuestions = function () {
        /*** Configura o cabeçalho     */
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        //console.log("ACTIVE ROOM"+this.getActiveRoom());

        return $http.get(ApiPath + '/easyroom/'+this.getActiveRoom().id+'/questions/', config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("ERRO: Falha ao obter questão...",err)
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

        return $http.get(ApiPath + '/easyroom/'+this.getActiveRoom().id+'/question/'+$TeamService.getActiveTeam().id+"/", config).then(function (response) {
            return response;                         
        }).catch(function (err) {
            console.log("ERRO: Falha ao obter questão...",err)
            return err;
        });
    }

    this.makeAlternative = function (question) {
        /**
         * Configura o cabeçalho
         */
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.post(ApiPath + '/easyroom/'+this.getActiveRoom().id+'/question/' ,question, config).then(function (response) {
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
        return $http.post(ApiPath + '/easyroom/', room, config).then(function(response) {
                  
             console.log("room")                     
                                  
            return response
        }).catch(function (err) {
            console.log("ERRO: Falha ao criar sala...")
            return err;
        });
    }



    this.insertQuestion = function(question){
        var config = {
            headers: {
                Authorization: localStorage.getItem("cleangameToken")
            }
        }

        return $http.post(ApiPath + '/easyroom/'+this.getActiveRoom().id+'/question/', question, config).then(function(response) {
                  
             console.log("Question")                     
                                  
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



   

   
}])