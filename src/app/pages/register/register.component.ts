import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
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
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    }, { updateOn: 'change' }); 
  }

  
  onSubmit() {
    console.log(48645);
    
    this.loadingGif.nativeElement.style.display = 'block';
    this.buttonText.nativeElement.style.display = 'none';
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      let email = this.registerForm.value.email;
      let password = this.registerForm.value.password;

      let user = { email, password };
      console.log(user);
      
      
      this.req.postData(environment.register.get, user).subscribe(
        (response: any) => {
          console.log('Register successful', response);
          localStorage.setItem('accessToken', response.accessToken);
          this.router.navigate([''])
          this.loadingGif.nativeElement.style.display = 'none';
          this.buttonText.nativeElement.style.display = 'block';
          localStorage.setItem('accessToken', response.token);
          localStorage.setItem('popupInfo', 'true');
          localStorage.setItem('email', email);
          localStorage.setItem('userId', response.id); 
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
            // this.incorrectPass.nativeElement.style.display = 'block'; 
            // this.userNotFound.nativeElement.style.display = 'none'; 
          } else if (error.error.error === 'User not found'){
            // this.userNotFound.nativeElement.style.display = 'block'; 
            // this.incorrectPass.nativeElement.style.display = 'none';
          } else {
            console.log('frgfg');
            
          }
        }
      );
    } else {
      console.log('not valid');
      
    }
  }
}
