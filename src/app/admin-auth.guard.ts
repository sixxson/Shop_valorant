import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './models/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser(); 
    if (currentUser && currentUser.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
