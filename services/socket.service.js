app.service('$SocketService', ['$http', 'ApiPath','SocketServer','SocketPort', function ($http, ApiPath,SocketServer,SocketPort ) {

    
    //Mantem dados do usuario autenticado
    this.room = {}
    //this.url =  "http://ec2-52-67-255-100.sa-east-1.compute.amazonaws.com/";
    //this.url =  "http://10.42.0.147";
    this.url =  SocketServer;
    this.port = SocketPort;
    this.socket = null;

    this.usermail;
    this.roomid;

    this.conect = function(){
        this.socket = io.connect(this.url+":"+this.port);

    }

    this.registerUser = function(user){
        console.log("SOCKET: USER REGISTER ", user);
        this.usermail = user.mail;
        this.socket.emit("register_user",user);
    }

    this.registerUserRoom = function(teamid){
        console.log("SOCKET: USER REGISTER IN ROOM: ", teamid);
        this.roomid = teamid;
        room = {}
        room.id = teamid;
        room.usermail = this.usermail;
        this.socket.emit("register_user_in_room",room);        
        //register_user_in_room
       return this.room;
    }

    this.moveMouse = function(ponteiros){
        eventMove = {};
        eventMove.user = this.usermail;
        eventMove.room = this.roomid;
        eventMove.x = (ponteiros.page.x * 300) / $(window).width();    
        eventMove.y = (ponteiros.page.y * 300) / $(window).height();  
        //console.log("SOCKET: MOVEMOUSE: ", eventMove);
        this.socket.emit("movemouse",eventMove);       
    }
    

    this.sendChatMessage = function(msg){
        console.log("SOCKET: EXIBE DICA");
        mensagem = {}
        mensagem.sala = this.roomid;
        mensagem.usermail = this.usermail;
        mensagem.text = msg;
        this.socket.emit("sendchatmsg",mensagem);
    }

    this.getTip = function(tip){
        console.log("SOCKET: EXIBE DICA");
        dica = {}
        dica.id = this.roomid;
        dica.tip = tip;
        this.socket.emit("gettip",dica);
    }
    
    this.makeAlternative = function(){
        console.log("SOCKET: MARCA UMA ALTERNATIVA");
        //this.usermail = user.mail;
        this.socket.emit("makealternative",this.roomid);
    }

   

   
}])