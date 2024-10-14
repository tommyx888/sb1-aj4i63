import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    const success = await this.authService.signIn(this.email, this.password);
    if (success) {
      this.router.navigate(['/onboarding']);
    } else {
      // Show error message
    }
  }
}