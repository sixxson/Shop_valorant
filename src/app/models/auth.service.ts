import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000'; // Thay đổi URL nếu cần
  private currentUser: any;

  // Kiểm tra xem người dùng đã đăng nhập chưa thông qua localStorage
  get isLoggedIn(): Observable<boolean> {
    // Kiểm tra xem có thông tin đăng nhập trong localStorage không và cập nhật giá trị cho biến loggedIn 
    return this.loggedIn.asObservable();
  }
  // Lấy thông tin người dùng hiện tại từ localStorage
  constructor(private http: HttpClient, private router: Router) {
    // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi chạy
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      // Cập nhật giá trị cho biến loggedIn và currentUser nếu có thông tin đăng nhập trong localStorage
      this.currentUser = JSON.parse(storedUser);
      this.loggedIn.next(true);
    }
  }
  // Gửi request đăng nhập đến server thông qua HttpClient
  login(credentials: any): Observable<any> {
    const usersUrl = `${this.apiUrl}/user`;
    return this.http.get(usersUrl, { params: credentials });
  }

  // Hàm logout để đăng xuất người dùng khỏi hệ thống và xóa thông tin đăng nhập khỏi localStorage
  logout() {
    this.loggedIn.next(false);
    this.currentUser = null;
    localStorage.removeItem('currentUser'); // Xóa thông tin đăng nhập khỏi localStorage
    this.router.navigate(['/home']);
  }

  // Hàm setLoggedIn để cập nhật trạng thái đăng nhập và thông tin người dùng vào localStorage
  setLoggedIn(value: boolean, user: any = null) {
    this.loggedIn.next(value);
    if (value) {
      localStorage.setItem('currentUser', JSON.stringify(user)); // Lưu thông tin đăng nhập vào localStorage
      this.currentUser = user;
    }
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}
