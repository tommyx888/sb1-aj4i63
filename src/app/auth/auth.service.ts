import { Injectable } from '@angular/core';
import Clerk from '@clerk/clerk-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clerk: Clerk;

  constructor() {
    this.clerk = new Clerk('pk_test_ZW5qb3llZC10b21jYXQtNTEuY2xlcmsuYWNjb3VudHMuZGV2JA');
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      await this.clerk.signIn.create({
        identifier: email,
        password: password
      });
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  }

  async signOut(): Promise<void> {
    await this.clerk.signOut();
  }

  isAuthenticated(): boolean {
    return !!this.clerk.session;
  }

  getCurrentUser() {
    return this.clerk.user;
  }
}