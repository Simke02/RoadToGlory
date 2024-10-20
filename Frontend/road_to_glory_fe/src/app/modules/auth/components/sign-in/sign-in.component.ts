import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signin_form: FormGroup;

  constructor(
    private auth_service: AuthService,
    private router: Router
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
    
    //Pozovi metodu za slanje na server
    //Prebaci na lobby
    this.auth_service.auth({
      username,
      password
    }).subscribe({
      next:res=>{
        console.log(res);
        localStorage.setItem("username", res.username);
      }
    })
    this.router.navigate(['/lobby'])
  }

  navigateToSignup() {
    this.router.navigate(['/singup']);
  }
}
