import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BasicFacility } from 'src/app/common/models/basic_facility.model';
import { AttackDto } from 'src/app/common/models/dto/attack.dto';
import { DestroyDto } from 'src/app/common/models/dto/destroy.dto';
import { MoveDto } from 'src/app/common/models/dto/move.dto';
import { Unit } from 'src/app/common/models/unit/unit.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:3000');
   }

   //metode za slanje poruka
  sendMessage( message: any): void {
    this.socket.emit('newMessage', { message});
  }

  joinRoom(): void {
    this.socket.emit('joinRoom');
  }

  leaveRoom(room: string): void{
    this.socket.emit('leaveRoom', {"room":room});
  }

  sendAttack(room: string, attack: AttackDto): void{
    this.socket.emit('attack', {"room": room, "attackDto": attack});
  }

  sendDestroy(room: string, destroy: DestroyDto): void{
    this.socket.emit('destroy', {"room": room, 'destroyDto': destroy});
  }

  sendMove(room: string, unit: Unit):void{
    this.socket.emit('move', {"room": room, "unit": unit});
  }

  sendDestroyCity(room: string, destroy_city: DestroyDto): void{
    this.socket.emit('destroyCity', {'room': room, 'destroyDto': destroy_city});
  }

  sendProduceUnit(room: string, unit:Unit):void{
    this.socket.emit('produceUnit', {"room": room, 'unit': unit});
  }

  sendProduceFacility(room: string, facility:BasicFacility): void{
    this.socket.emit('produceFacility', {"room": room, 'facility': facility});
  }

  sendNextTurn(room: string):void{
    this.socket.emit('nextTurn', {'room': room});
  }

  sendEndGame(room: string, winner: string): void{
    this.socket.emit('endGame', {"room": room, 'winner': winner});
  }

  sendSurrendered(room: string, loser: string): void{
    this.socket.emit('surrender', {"room": room, "loser": loser});
  }

  //observeri za poruke
  getCreateGame(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('oncreateGame', (data: any) => {
        observer.next(data);
      });
    });
  }

  getJoin(): Observable<any>{
    return new Observable(observer=>{
      const listener = (room: string)=>{
        observer.next(room);
      };
      this.socket.on('onJoin', listener);
      
      return()=>{
        this.socket.off('onJoin', listener);
      };
    });
  }

  getLeave(): Observable<any>{
    return new Observable(observer=>{
      const listener = (message:string)=>{
        observer.next(message);
      };
      this.socket.on('onLeave', listener);
      
      return()=>{
        this.socket.off('onLeave', listener);
      };
    });
  }

  getAttack(): Observable<AttackDto>{
    return new Observable(observer=>{
      const listener = (attack:AttackDto)=>{
        observer.next(attack);
      };

      this.socket.on('onAttack', listener);

      return()=>{
        this.socket.off('onAttack', listener);
      }
    });
  }

  getDestroy(): Observable<DestroyDto>{
    return new Observable(observer=>{
      const listener = (destroy: DestroyDto) =>{
        observer.next(destroy);
      };

      this.socket.on('onDestroy', listener);

      return()=>{
        this.socket.off('onDestroy', listener);
      }
    });
  }

  getDestroyCity(): Observable<DestroyDto>{
    return new Observable(observer=>{
      const listener = (destroy_city: DestroyDto) =>{
        observer.next(destroy_city);
      };

      this.socket.on('onDestroyCity', listener);

      return()=>{
        this.socket.off('onDestroyCity', listener);
      }
    });
  }

  getMove(): Observable<Unit>{
    return new Observable(observer=>{
      const listener = (unit: Unit)=>{
        observer.next(unit);
      };

      this.socket.on('onMove', listener);
      
      return()=>{
        this.socket.off('onMove', listener);
      }
    });
  }

  getProduceUnit(): Observable<any>{
    return new Observable(observer=>{
      const listener = (unit: Unit)=>{
        observer.next(unit);
      };

      this.socket.on('onProduceUnit', listener);

      return()=>{
        this.socket.off('onProduceUnit', listener);
      }
    });
  }

  getProduceFacility(): Observable<any>{
    return new Observable(observer=>{
      const listener = (facility: BasicFacility)=>{
        observer.next(facility);
      };

      this.socket.on('onProduceFacility', listener);

      return()=>{
        this.socket.off('onProduceFacility', listener);
      }
    });
  }

  getNextTurn(): Observable<any>{
    return new Observable(observer=>{
      const listener = ()=>{
        observer.next();
      };

      this.socket.on('onNextTurn', listener);

      return()=>{
        this.socket.off('onNextTurn', listener);
      };
    });
  }

  getEndGame(): Observable<string>{
    return new Observable(observer=>{
      const listener = (winner: string)=>{
        observer.next(winner);
      };

      this.socket.on('onEndGame', listener);

      return()=>{
        this.socket.off('onEndGame', listener);
      };
    });
  }

  getSurrendered(): Observable<string>{
    return new Observable(observer => {
      const listener = (loser: string)=>{
        observer.next(loser);
      };

      this.socket.on('onSurrender', listener);

      return()=>{
        this.socket.off('onSurrender', listener);
      };
    });
  }
}
