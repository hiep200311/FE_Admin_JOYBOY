import { Component, OnInit } from '@angular/core';
import { AuthuServiceService } from '../../../service/authService/authu-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(35)]),
  });

  get f(){
    return this.formLogin.controls;
  }

  checkError: any;
   
   constructor(private authService: AuthuServiceService, private router: Router) { }

   onLogin(): void {
     this.login();
  }

  
  login(){
    const { email, password } = this.formLogin.value;

    this.authService.login(email, password).subscribe(
      response => {
        console.log(response);
        this.tokenData(response.data);
        this.handleUserRole(response.data.roles);
      },
      error => {
        console.error('Login failed', error);
        this.checkError = 'Email or password is incorrect, please re-enter..';
      }
    );
  }

  private tokenData(data: any): void {
    // Lưu token vào localStorage 
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('refreshToken', data.refreshToken);
  }

  private handleUserRole(roles: string[]): void {
    if (roles.includes('[ADMIN]')) {
      this.router.navigate(['/sidebar-menu']);
    }
  }
}