import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:3000');
   }

   sendMessage(room: string, message: any): void {
    this.socket.emit('newMessage', { room, message });
  }

  getMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('onMessage', (data: any) => {
        observer.next(data);
      });
    });
  }

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', {"room":room});
  }
}
