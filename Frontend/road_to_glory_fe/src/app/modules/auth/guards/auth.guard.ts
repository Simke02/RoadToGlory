import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { CurrentUserService } from "../services/current_user.service";

export const authGuard: CanActivateFn = () => {
  const userService = inject(CurrentUserService);
  const router = inject(Router);
  return userService.getCurrentUser$().pipe(
    map((user) => !!user),
    tap((valid) => {
      if (!valid) {
        router.navigate(["/login"]);
      }
    }),
  ) as Observable<boolean>;
};