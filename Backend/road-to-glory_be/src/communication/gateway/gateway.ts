import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { subscribe } from "diagnostics_channel";
import { connect } from "http2";
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
    room?: string;

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
        @MessageBody('room') room: string,
        @ConnectedSocket() client: Socket    
    ){
        const clients = this.server.sockets.adapter.rooms.get(room) || new Set();

        if (clients.size < 2) {
            client.join(room);
            this.room = room;
            console.log(`${client.id} joined room ${room}`);
            if(clients.size == 2)
                this.server.to(room).emit('onJoin', ` ${room} is ready!`);
        } else {
            console.log(`Room ${room} is full`);
            this.server.emit('roomFull', 'The room is full.');
        }
        
    }
    @SubscribeMessage('leaveRoom')
    onLeaveMessage(
        @ConnectedSocket() client: Socket    
    ){
        client.leave(this.room);
        this.server.to(this.room).emit('onLeave', `User ${client.id} left room`);
        this.room = null;
    }

    //attack
    @SubscribeMessage('attack')
    onAttackMessage(
        @MessageBody('attackDto') attack: AttackDto,
        @ConnectedSocket() client: Socket 
    ){
        client.broadcast.to(this.room).emit('onAttack', attack);
    }

    //destroy
    @SubscribeMessage('destroy')
    onDestroyMessage(
        @MessageBody('destroyDto') destroy: DestroyDto,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(this.room).emit('odDestroy', destroy);
    }

    //move
    @SubscribeMessage('move')
    onMoveMessage(
        @MessageBody('unit') unit: Unit,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(this.room).emit('onMove', unit);
    }

    //produceUnit
    @SubscribeMessage('produceUnit')
    onProduceUnitMessage(
        @MessageBody('unit') unit: Unit,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(this.room).emit('onProduceUnit', unit);
    }

    //produceFacility
    @SubscribeMessage('produceFacility')
    onProduceFacilityMessage(
        @MessageBody('facility') facility: BasicFacility,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(this.room).emit('onProduceFacility', facility);
    }

    //nextTurn
    @SubscribeMessage('nextTurn')
    onNextTurn(
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(this.room).emit('onNextTurn');
    }

    //gameEnd
    @SubscribeMessage('endGame')
    onEndGame(
        @MessageBody('winner') winner: string,
        @ConnectedSocket() client: Socket
    ){
        client.broadcast.to(this.room).emit('onEndGame', winner);
    }
}
