import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { NgIf } from '@angular/common';
import { environment } from '../../../environments/environmen';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {
  forgotPassForm: FormGroup;
  @ViewChild('loadingGif') loadingGif!: ElementRef;
  @ViewChild('buttonText') buttonText!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private req: RequestService,
    private router: Router
  ) {
    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    }, { updateOn: 'change' }); 
  }

  
  onSubmit() {
    this.loadingGif.nativeElement.style.display = 'block';
    this.buttonText.nativeElement.style.display = 'none';
    if (this.forgotPassForm.valid) {
      console.log(this.forgotPassForm.value);

      let email = this.forgotPassForm.value.email;

      let user = { email };
      
      this.req.postData(environment.forgotPassword.get, user).subscribe(
        (response: any) => {
          console.log('Requeted code successful', response);
          this.router.navigate(['reset-password'])
          this.loadingGif.nativeElement.style.display = 'none';
          this.buttonText.nativeElement.style.display = 'block';
        },
        (error: any) => {
          this.loadingGif.nativeElement.style.display = 'none';
          this.buttonText.nativeElement.style.display = 'block';
          console.log(error.error.error);

          if (error.error) {
            console.log('Full error:', error.error);  
          }

        }
      );
      window.location.href = './reset-password?email=' + encodeURIComponent(email);
    }
  }
}
 