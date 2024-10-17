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

@Injectable()
export class GameObjectService {
    
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

    destroy(destroyDto: DestroyDto): Observable<DestroyDto> {
        return this.http.post<DestroyDto>(environment.baseApiUrl + `/game-object/destroy`, destroyDto);
    }

    move(moveDto: MoveDto): Observable<MoveDto> {
        return this.http.post<MoveDto>(environment.baseApiUrl + `/game-object/destroy`, moveDto);
    }

    produceUnit(unit_type: string, unit_name: string, x_coor: number, y_coor: number): Observable<Unit> {
        return this.http.get<Unit>(environment.baseApiUrl + `/game-object/produceUnit/${unit_type}/${unit_name}/${x_coor}/${y_coor}`);
    }

    produceFacility(facility_id: string, x_coor: number, y_coor: number): Observable<BasicFacility> {
        return this.http.get<BasicFacility>(environment.baseApiUrl + `/game-object/produceFacility/${facility_id}/${x_coor}/${y_coor}`);
    }

    whatUpgradesExist(): Observable<UpgradesDto> {
        return this.http.get<UpgradesDto>(environment.baseApiUrl + `/game-object/whatUpgrades`);
    }

    researchUpgrade(what_upgrade: string): Observable<Upgrade> {
        return this.http.get<Upgrade>(environment.baseApiUrl + `/game-object/researchUpgrade/${what_upgrade}`);
    }

    getTerrain(): Observable<string[][]> {
        return this.http.get<string[][]>(environment.baseApiUrl + `/game-object/getTerrain`);
    }

    getPosition(x_coor: number, y_coor: number): Observable<Position> {
        return this.http.get<Position>(environment.baseApiUrl + `/game-object/getPosition/${x_coor}/${y_coor}`);
    }
}