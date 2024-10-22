import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/common/environment";
import { UserInfo } from "src/app/common/models/dto/user_info.dto";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    auth(user: { username: string; password: string }): Observable<UserInfo> {
        return this.http.post<UserInfo>(`${environment.baseApiUrl}/auth/auth`, user,{withCredentials:true});
    }
    
    signup(user: {
        username: string;
        password: string;
        firstName: string;
        lastName: string;
      }) {
        return this.http.post(environment.baseApiUrl + '/auth', user);
    }
    getUserInfo(): Observable<UserInfo> {
      return this.http.get<UserInfo>(environment.baseApiUrl + '/auth/me');
    }
}