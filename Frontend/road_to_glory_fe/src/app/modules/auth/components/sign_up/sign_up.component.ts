import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign_up.component.html',
  styleUrls: ['./sign_up.component.css']
})
export class SignUpComponent {


  constructor(
    private auth_service: AuthService,
    private router: Router
  ) {}

  signupForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    contactPhone: new FormControl(),
  });

  onBtnClick() {
    const formRaw = this.signupForm.getRawValue();
    const userContactInfo = {
      email: formRaw.email,
      contactPhone: formRaw.contactPhone,
    };
    // this.userService
    //   .signup({
    //     ...formRaw,
    //     userContactInfo,
    //   })
    //   .subscribe(
    //     (response) => {
    //       this.router.navigate(["/login"]);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }

}
