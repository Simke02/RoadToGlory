import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign_up/sign_up.component';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[AuthService]
})
export class AuthModule { }
