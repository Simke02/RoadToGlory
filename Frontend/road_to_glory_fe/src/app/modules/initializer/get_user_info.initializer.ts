import { catchError, Observable, of, tap, throwError } from "rxjs";
import { CurrentUserService } from "../auth/services/current_user.service";
import { UserInfo } from "src/app/common/models/dto/user_info.dto";
import { AuthService } from "../auth/services/auth.service";

export function getUserInfoInitializer(
  authService: AuthService,
  currentUserService: CurrentUserService,
): () => Observable<UserInfo> {
  return () =>
    authService.getUserInfo().pipe(
      tap((response) => {
        console.log(response);
        currentUserService.addCurrentUser(response)
      }),
      catchError((err) => of(err)),
    );
}