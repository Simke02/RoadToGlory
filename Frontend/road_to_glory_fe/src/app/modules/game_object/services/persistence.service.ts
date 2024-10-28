import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/common/environment";
import { AddStatsDto } from "src/app/common/models/dto/add_stats.dto";
import { Stats } from "src/app/common/models/stats/stats.model";

@Injectable()
export class PersistenceService {

    constructor(private http: HttpClient) {}

    addStats(addStatsDto: AddStatsDto): Observable<void> {
        return this.http.put<void>(environment.baseApiUrl + `/persistence/addStats`, addStatsDto);
    }

    createStats(username: string): Observable<void> {
        return this.http.post<void>(environment.baseApiUrl + `/persistence/createStats`, {username});
    }

    userStats(username: string): Observable<Stats>{
        return this.http.get<Stats>(environment.baseApiUrl + `/persistence/userStats/${username}`);
    }

    bestStats():  Observable<Stats[]>{
        return this.http.get<Stats[]>(environment.baseApiUrl + `/persistence/bestStats`);
    }
}