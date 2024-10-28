import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/app/common/environment";
import { AuthDto } from "src/app/common/models/dto/auth.dto";
import { UserInfo } from "src/app/common/models/dto/user_info.dto";

@Injectable()
export class AuthService {

  logged_in= new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {}

    auth(user: { username: string; password: string }): Observable<AuthDto> {
        return this.http.post<AuthDto>(`${environment.baseApiUrl}/auth/auth`, user);
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
      const local_token = localStorage.getItem('token');
      let token='';
      if(local_token){
        token = JSON.parse(local_token).toString()
      }
      const httpOptions = {
        headers: new HttpHeaders().set('Authorization', 'Bearer' + token)
      };
      return this.http.get<UserInfo>(environment.baseApiUrl + '/auth/me', httpOptions);
    }

    logout() {
      sessionStorage.clear();
    }
}