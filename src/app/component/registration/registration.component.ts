import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  isDisabled: boolean = true;
  registration: FormGroup | any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registration = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl(),
      'email': new FormControl(),
      'confirm_password': new FormControl()
    })
    this.registration.valueChanges.subscribe(() => {
      this.checkInputs();
    });
  }

  checkInputs() {
    const { username, email, password, confirm_password } = this.registration.value;
    this.isDisabled = !(username && email && password && confirm_password && password === confirm_password && password.length >= 8);
  }

  signupdata(registration: FormGroup) {
    // Xóa trường confirm_password từ dữ liệu trước khi gửi request
    const { confirm_password, ...userData } = this.registration.value;
    // Thêm trường role vào dữ liệu trước khi gửi request
    userData.role = 'user';
    // Gửi request đăng ký user đến server
    this.http.post('http://localhost:3000/user', userData)
    .subscribe((res) => {
      console.log('User registered successfully', res);
      // Chuyển hướng đến trang đăng nhập (/login) sau khi đăng ký thành công
      this.router.navigate(['/login']);
      }, (error) => {
        console.error('Error registering user', error);
        // Xử lý lỗi một cách thích hợp
      });

  }

}

