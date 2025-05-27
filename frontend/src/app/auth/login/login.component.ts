import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Already there
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup; // Declare a FormGroup property

  constructor(private fb: FormBuilder) { // Inject FormBuilder
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Add username control with required validator
      password: ['', Validators.required]  // Add password control with required validator
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      // TODO: Call your backend /login endpoint here
    } else {
      console.log('Login form is invalid. Please check fields.');
      // You might want to show error messages to the user
    }
  }
}