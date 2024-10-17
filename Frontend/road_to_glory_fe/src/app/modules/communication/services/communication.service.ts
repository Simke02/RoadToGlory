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

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', {"room":room});
  }

  leaveRoom(): void{
    this.socket.emit('leaveRoom');
  }

  sendAttack(attack: AttackDto): void{
    this.socket.emit('attack', {"attackDto": attack});
  }

  sendDestroy(destroy: DestroyDto): void{
    this.socket.emit('destroy', {'destroyDto': destroy});
  }

  sendMove(unit: Unit):void{
    this.socket.emit('move', {"unit": unit});
  }

  sendProduceUnit(unit:Unit):void{
    this.socket.emit('produceUnit', {'unit': unit});
  }

  sendProduceFacility(facility:BasicFacility): void{
    this.socket.emit('produceFacility', {'facility': facility});
  }

  sendNextTurn():void{
    this.socket.emit('nextTurn');
  }

  sendEndGame(winner: string): void{
    this.socket.emit('endGame', {'winner': winner});
  }

  //observeri za poruke
  getMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('onMessage', (data: any) => {
        observer.next(data);
      });
    });
  }

  getJoin(): Observable<any>{
    return new Observable(observer=>{
      const listener = (message:string)=>{
        observer.next(message);
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
}
