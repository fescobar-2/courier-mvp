import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// PrimeNG Modules for Standalone Component
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
// If you use p-messages or p-toast for error display later
// import { MessagesModule } from 'primeng/messages';
// import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    // PrimeNG Modules
    CardModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    // MessagesModule, // if using p-messages
    // ToastModule,    // if using p-toast
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected from styleUrl
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      // Using emailOrUsername to be flexible, adjust validators as needed
      // If it can be either, complex validation might be needed, or keep it simple for now.
      // For simplicity, let's assume it's an email for now.
      emailOrUsername: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false] // Initial value for rememberMe
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      // TODO: Call your backend /login endpoint here
      // e.g., this.authService.login(this.loginForm.value).subscribe(
      //   response => { /* Handle success */ },
      //   error => { /* Handle error, show message to user */ }
      // );
    } else {
      console.log('Login form is invalid. Please check fields.');
      // Mark all fields as touched to display validation errors, if you have them set up in the template
      this.loginForm.markAllAsTouched();
      // TODO: Display user-friendly error messages (e.g., using p-toast or p-messages)
    }
  }
}