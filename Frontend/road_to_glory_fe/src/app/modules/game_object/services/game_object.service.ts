//Ovde treba da napises kontrolere za game_obj sa nesta
import { Observable } from "rxjs"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/app/common/environment";
import { Injectable } from "@angular/core";
import { BuildingsDto } from "src/app/common/models/dto/buildings.dto";
import { Unit } from "src/app/common/models/unit/unit.model";
import { PositionStep } from "src/app/common/models/position/position_step.model";
import { AttackDto } from "src/app/common/models/dto/attack.dto";
import { DestroyDto } from "src/app/common/models/dto/destroy.dto";
import { MoveDto } from "src/app/common/models/dto/move.dto";
import { BasicFacility } from "src/app/common/models/basic_facility.model";
import { UpgradesDto } from "src/app/common/models/dto/upgrades.dto";
import { Position } from "src/app/common/models/position/position.model";
import { Upgrade } from "src/app/common/models/upgrade/upgrade.model";
import { CreateGameDto } from "src/app/common/models/dto/create_game.dto";
import { NextTurnDto } from "src/app/common/models/dto/next_turn.dto";
import { AddPlayerDto } from "src/app/common/models/dto/add_player.dto";
import { UnitDto } from "src/app/common/models/dto/unit.dto";

@Injectable()
export class GameObjectService {
    
    constructor(private http: HttpClient) {}
    
    whatCanBeBuilt(x_coor: number, y_coor: number, room: string): Observable<BuildingsDto> {
        return this.http.get<BuildingsDto>(environment.baseApiUrl + `/game-object/whatCanBeBuilt/${x_coor}/${y_coor}/${room}`);
    }

    unitTurnPossibilities(unitDto: UnitDto): Observable<PositionStep[]> {
        return this.http.post<PositionStep[]>(environment.baseApiUrl + `/game-object/unitTurnPossibilities`, unitDto);
    }

    attack(attackDto: AttackDto): Observable<AttackDto>{
        return this.http.post<AttackDto>(environment.baseApiUrl + `/game-object/attack`, attackDto);
    }

    destroy(destroyDto: DestroyDto): Observable<DestroyDto> {
        return this.http.post<DestroyDto>(environment.baseApiUrl + `/game-object/destroy`, destroyDto);
    }

    move(moveDto: MoveDto): Observable<Unit> {
        return this.http.post<Unit>(environment.baseApiUrl + `/game-object/move`, moveDto);
    }

    produceUnit(unit_type: string, unit_name: string, x_coor: number, y_coor: number, room: string): Observable<Unit> {
        return this.http.get<Unit>(environment.baseApiUrl + `/game-object/produceUnit/${unit_type}/${unit_name}/${x_coor}/${y_coor}/${room}`);
    }

    produceFacility(facility_id: string, x_coor: number, y_coor: number, room: string): Observable<BasicFacility> {
        return this.http.get<BasicFacility>(environment.baseApiUrl + `/game-object/produceFacility/${facility_id}/${x_coor}/${y_coor}/${room}`);
    }

    whatUpgradesExist(): Observable<UpgradesDto> {
        return this.http.get<UpgradesDto>(environment.baseApiUrl + `/game-object/whatUpgrades`);
    }

    researchUpgrade(what_upgrade: string): Observable<Upgrade> {
        return this.http.get<Upgrade>(environment.baseApiUrl + `/game-object/researchUpgrade/${what_upgrade}`);
    }

    getTerrain(room: string): Observable<string[][]> {
        return this.http.get<string[][]>(environment.baseApiUrl + `/game-object/getTerrain/${room}`);
    }

    getPosition(x_coor: number, y_coor: number, room: string): Observable<Position> {
        return this.http.get<Position>(environment.baseApiUrl + `/game-object/getPosition/${x_coor}/${y_coor}/${room}`);
    }

    addPlayer(addPlayerDto: AddPlayerDto): Observable<void> {
        return this.http.post<void>(environment.baseApiUrl + `/game-object/addPlayer`, addPlayerDto);
    }

    createGame(room: string): Observable<CreateGameDto> {
        return this.http.get<CreateGameDto>(environment.baseApiUrl + `/game-object/createGame/${room}`);
    }

    nextTurn(nextTurnDto: NextTurnDto): Observable<void> {
        return this.http.post<void>(environment.baseApiUrl + `/game-object/nextTurn`, nextTurnDto);
    }

    endGame(room: string): Observable<void> {
        return this.http.post<void>(environment.baseApiUrl + `/game-object/endGame`, {room});
    }
}