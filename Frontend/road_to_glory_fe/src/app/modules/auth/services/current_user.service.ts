import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserInfo } from "src/app/common/models/dto/user_info.dto";

@Injectable({
  providedIn: "root",
})
export class CurrentUserService {
  private currentUser$: BehaviorSubject<UserInfo | null> =
    new BehaviorSubject<UserInfo | null>(null);
  constructor() {}

  addCurrentUser(currUser: UserInfo): void {
    this.currentUser$.next(currUser);
  }

  getCurrentUser$(): Observable<UserInfo | null> {
    return this.currentUser$.asObservable();
  }

  getCurrentUser(): UserInfo | null {
    return this.currentUser$.value;
  }
}