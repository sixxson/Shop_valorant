import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../models/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isDisabled: boolean = true;
  login: FormGroup | any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.login = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.required),
    });

    this.login.valueChanges.subscribe(() => {
      this.checkInputs();
    });
  }

  checkInputs() {
    const { username, password } = this.login.value;
    this.isDisabled = !(username && password && password.length >= 8);
  }

  logindata() {
    // 
    if (this.login.invalid) {
      return;
    }
    this.authService.login(this.login.value).subscribe(
      (user: any) => {
        if (user.length > 0) {
          console.log('Đăng nhập thành công');
          this.authService.setLoggedIn(true, user[0]); 
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }
}
