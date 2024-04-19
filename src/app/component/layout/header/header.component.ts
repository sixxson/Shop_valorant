import { Component, OnInit, OnDestroy } from '@angular/core';
import { GunService } from '../../../models/gun.service';
import { AuthService } from '../../../models/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit, OnDestroy {
  carts: any[] = [];
  totalQuantity: number = 0;
  private subscription: Subscription = new Subscription();
  isLoggedIn: boolean = false;
  constructor(private gunService: GunService, private authService: AuthService) {}

  ngOnInit(): void {
    this.carts = this.gunService.getCarts();
    this.calculateTotalQuantity();

    // Kiểm tra trạng thái đăng nhập khi component được khởi tạo
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private calculateTotalQuantity(): void {
    this.totalQuantity = this.carts.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }



  logout() {
    this.authService.logout();
  }
}