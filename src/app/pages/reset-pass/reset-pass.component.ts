import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';

import { environment } from '../../../environments/environmen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {
  resetForm: FormGroup;

  @ViewChild('loadingGif') loadingGif!: ElementRef;
  @ViewChild('buttonText') buttonText!: ElementRef;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private req: RequestService,
    private router: Router 
  ) {
    this.resetForm = this.fb.group({
      resetcode: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    }, { updateOn: 'change' }); 
  }

  
  onSubmit() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email'); 
    console.log(email);
    

    this.loadingGif.nativeElement.style.display = 'block';
    this.buttonText.nativeElement.style.display = 'none';
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);

    let code = this.resetForm.value.resetcode;
    let newPassword = this.resetForm.value.newPassword;

    let user =JSON.stringify({ email, code, newPassword })
      console.log(user);
      
      this.req.postData(environment.resetPassword.get, user).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          this.loadingGif.nativeElement.style.display = 'none';
          this.buttonText.nativeElement.style.display = 'block';
          this.router.navigate(['login'])
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
          } else if (error.error.error === 'User not found'){
          } else {
            console.log('frgfg');
            
          }
        }
      );
    }
  }

}
