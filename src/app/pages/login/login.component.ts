import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'; // Update with your environment variables
import { NgIf } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent {
  loginForm: FormGroup;
  @ViewChild('incorrectPass') incorrectPass!: ElementRef;
  @ViewChild('loadingGif') loadingGif!: ElementRef;
  @ViewChild('buttonText') buttonText!: ElementRef;
  @ViewChild('userNotFound') userNotFound!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private req: RequestService,
    private router: Router 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    }, { updateOn: 'change' }); 
  }



  onSubmit() {
    this.loadingGif.nativeElement.style.display = 'block';
    this.buttonText.nativeElement.style.display = 'none';
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      let user = { email, password };
      
      this.req.postData(environment.login.get, user).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('accessToken', response.accessToken);
          this.router.navigate([''])
          this.loadingGif.nativeElement.style.display = 'none';
          this.incorrectPass.nativeElement.style.display = 'none';
          this.userNotFound.nativeElement.style.display = 'none'; 
          this.buttonText.nativeElement.style.display = 'block';
        },
        (error: any) => {
          this.loadingGif.nativeElement.style.display = 'none';
          this.buttonText.nativeElement.style.display = 'block';
          console.log(error.error.error);
          
          console.log('Login failed', error);
          if (error.error) {
            console.log('Full error:', error.error);  
          }
          if (error.error.error === 'Invalid password') {
            this.incorrectPass.nativeElement.style.display = 'block'; 
            this.userNotFound.nativeElement.style.display = 'none'; 
          } else if (error.error.error === 'User not found'){
            this.userNotFound.nativeElement.style.display = 'block'; 
            this.incorrectPass.nativeElement.style.display = 'none';
          } else {
            console.log('frgfg');
            
          }
        }
      );
    }
  }
}
