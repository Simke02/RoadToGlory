import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { subscribe } from "diagnostics_channel";
import { connect } from "http2";
import { from } from "rxjs";
import { Server, Socket } from 'socket.io'
import { BasicFacility } from "src/common/models/basic_facility.model";
import { AttackDto } from "src/common/models/dto/attack.dto";
import { DestroyDto } from "src/common/models/dto/destroy.dto";
import { MoveDto } from "src/common/models/dto/move.dto";
import { Facility } from "src/common/models/facility/facility.model";
import { Unit } from "src/common/models/unit/unit.model";

@WebSocketGateway({
    cors: {
      origin: 'http://localhost:4200',  // URL of your Angular app
      methods: ['GET', 'POST'],
      credentials: true,                // Allow credentials like cookies or auth headers
    }
  })
export class MyGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect{
    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);      
    }

    handleDisconnect(client: Socket) {
        console.log(`client disconnected: ${client.id}`)
     
    }
    onModuleInit() {
        this.server.on('connection', (socket)=>{
            console.log('connected');
        })
    }

    @WebSocketServer()
    server:Server
    room: string="";
    id_gen:number =1;

    @SubscribeMessage('createGame')
    onNewMessage(
        @MessageBody('message') message: string, 
        @ConnectedSocket() client: Socket)
        {
        console.log(message);
        client.broadcast.to(this.room).emit('oncreateGame', {
            msg: message,
        });
    }

    @SubscribeMessage('joinRoom')
    async onJoinRoom(
        //@MessageBody('room') room: string,
        @ConnectedSocket() client: Socket    
    ){
        if(this.room==="")
            this.room= this.id_gen.toString();
      
        const clients = this.server.sockets.adapter.rooms.get(this.room) || new Set();
        
        if (clients.size < 2) {
            client.join(this.room);

            console.log(`${client.id} joined room ${this.room}`);
            if(clients.size == 2){
                this.server.to(this.room).emit('onJoin', this.room);
                console.log(this.room);
                this.id_gen++;
                this.room="";
            }
                
        } else {
            console.log(`Room ${this.room} is full`);
            this.server.emit('onRoomFull', 'The room is full.');
        }
        
    }
    @SubscribeMessage('leaveRoom')
    onLeaveMessage(
        @MessageBody('room') room :string,
        @ConnectedSocket() client: Socket    
    ){
        client.leave(room);
        this.server.to(room).emit('onLeave', `User ${client.id} left room`);
        this.room = null;
    }

    //attack
    @SubscribeMessage('attack')
    onAttackMessage(
        @MessageBody('room') room :string,
        @MessageBody('attackDto') attack: AttackDto,
        @ConnectedSocket() client: Socket 
    ){
        client.broadcast.to(room).emit('onAttack', attack);
    }

    //destroy
    @SubscribeMessage('destroy')
    onDestroyMessage(
        @MessageBody('room') room :string,
        @MessageBody('destroyDto') destroy: DestroyDto,
        @ConnectedSocket() client: Socket
    ){

        client.broadcast.to(room).emit('odDestroy', destroy);
    }

    //destroyCity
    @SubscribeMessage('destroyCity')
    onDestroyCityMessage(
        @MessageBody('room') room :string,
        @MessageBody('destroyDto') destroy_city: DestroyDto,
        @ConnectedSocket() client: Socket
    ){
        console.log("na server sam uso");
        client.broadcast.to(room).emit('onDestroyCity', destroy_city);
    }

    //move
    @SubscribeMessage('move')
    onMoveMessage(
        @MessageBody('room') room :string,
        @MessageBody('unit') unit: Unit,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(room).emit('onMove', unit);
    }

    //produceUnit
    @SubscribeMessage('produceUnit')
    onProduceUnitMessage(
        @MessageBody('room') room :string,
        @MessageBody('unit') unit: Unit,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(room).emit('onProduceUnit', unit);
    }

    //produceFacility
    @SubscribeMessage('produceFacility')
    onProduceFacilityMessage(
        @MessageBody('room') room :string,
        @MessageBody('facility') facility: BasicFacility,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(room).emit('onProduceFacility', facility);
    }

    //nextTurn
    @SubscribeMessage('nextTurn')
    onNextTurn(
        @MessageBody('room') room :string,
        @ConnectedSocket() client: Socket
    ){
        console.log("primio i emitujem" + room);
        client.broadcast.to(room).emit('onNextTurn');
    }

    //gameEnd
    @SubscribeMessage('endGame')
    onEndGame(
        @MessageBody('room') room :string,
        @MessageBody('winner') winner: string,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(room).emit('onEndGame', winner);
    }

    //surrender
    @SubscribeMessage('surrender')
    onSurrender(
        @MessageBody('room') room :string,
        @MessageBody('loser') loser: string,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(room).emit('onSurrender', loser);
    }
}
