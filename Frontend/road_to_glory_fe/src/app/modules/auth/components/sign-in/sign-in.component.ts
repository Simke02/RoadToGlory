import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../services/current_user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signin_form: FormGroup;
  loginError: string="";

  constructor(
    private auth_service: AuthService,
    private router: Router,
    private current_user_service:CurrentUserService
  ) {    
      this.signin_form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });}

  onSubmitSignin() {
    if(!this.signin_form.valid)
      return;
    const username = this.signin_form.get('username')?.value;
    const password = this.signin_form.get('password')?.value;
    
    this.auth_service.auth({
      username,
      password
    }).subscribe({
      next:res=>{
        
        sessionStorage.setItem('username', res.me.username);
        sessionStorage.setItem('token', res.token);
        
        this.auth_service.logged_in.next(true);
          
        this.router.navigate(['/lobby'])
        //this.current_user_service.addCurrentUser(res.me);
      },
      error: err=>{
        if (err.status === 404) {
          // Korisnik ne postoji
          this.loginError = 'Username does not exist. Please try again.';
        } else if (err.status === 406) {
          // Neispravna lozinka
          this.loginError = 'Wrong password. Try again!';
        } else {
          // Opšta greška
          this.loginError = 'An error occurred. Please try again later.';
        }
      }
      
      
    })
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
