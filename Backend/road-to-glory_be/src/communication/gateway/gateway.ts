import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'

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

    @SubscribeMessage('newMessage')
    onNewMessage(
        @MessageBody('room') room: string, 
        @MessageBody('message') message: string){
        console.log(message);
        this.server.to(room).emit('onMessage', {
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
            console.log(`${client.id} joined room ${room}`);
            this.server.to(room).emit('message', `You have joined room: ${room}`);
        } else {
            console.log(`Room ${room} is full`);
            this.server.emit('roomFull', 'The room is full.');
        }
        
    }
    @SubscribeMessage('leave')
    onLeaveMessage(
        @MessageBody('room') room: string,
        @ConnectedSocket() client: Socket    
    ){
        client.leave(room);
        this.server.to(room).emit('message', `User ${client.id} left room`);
    }

    //attack
    //destroy
    //move
    //produceUnit
    //produceFacility
    //nextTurn
}
