//Ovde treba da napises kontrolere za game_obj sa nesta
import { Observable } from "rxjs"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/app/common/environment";
import { Injectable } from "@angular/core";
import { BuildingsDto } from "src/app/common/models/dto/buildings.dto";
import { Unit } from "src/app/common/models/unit/unit.model";
import { PositionStep } from "src/app/common/models/position/position_step.model";
import { AttackDto } from "src/app/common/models/dto/attack.dto";

@Injectable()
export class GameService {
    
    constructor(private http: HttpClient) {}
    
    whatCanBeBuilt(x_coor: number, y_coor: number): Observable<BuildingsDto> {
        return this.http.get<BuildingsDto>(environment.baseApiUrl + `/game-object/whatCanBeBuilt/${x_coor}/${y_coor}`);
    }

    unitTurnPossibilities(unit: Unit): Observable<PositionStep[]> {
        return this.http.post<PositionStep[]>(environment.baseApiUrl + `/game-object/unitTurnPossibilities`, unit);
    }

    attack(attackDto: AttackDto): Observable<AttackDto>{
        return this.http.post<AttackDto>(environment.baseApiUrl + `/game-object/attack`, attackDto);
    }

    destroy() {
        
    }

    getTerrain(): Observable<string[][]> {
        return this.http.get<string[][]>(environment.baseApiUrl + `/game-object/getTerrain`);
    }
}