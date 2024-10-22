import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign_up.component.html',
  styleUrls: ['./sign_up.component.css']
})
export class SignUpComponent{

  signup_form: FormGroup;

  constructor(
    private auth_service: AuthService,
    private router: Router
  ) {    
      this.signup_form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required])
  });}

  onSubmitSignup() {
    if(!this.signup_form.valid)
      return;
    const username = this.signup_form.get('username')?.value;
    const password = this.signup_form.get('password')?.value;
    const first_name = this.signup_form.get('first_name')?.value
    const last_name = this.signup_form.get('last_name')?.value
    
    //Pozovi metodu za slanje na server
    //Prebaci na sign-in
    console.log('ovde ce da pozove servis');
    this.auth_service.signup({
      username,
      password,
      firstName:first_name,
      lastName:last_name
    }).subscribe();

    this.router.navigate(['']);

  }


}
