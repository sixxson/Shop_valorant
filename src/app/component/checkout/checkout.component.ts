import { Component } from '@angular/core';
import { GunService } from '../../models/gun.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../models/auth.service';
import { OtherService } from '../../models/other.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  carts: any = [];
  totalAmount: number = 0;
  selectedShippingValue: string = '';
  selectedShippingPrice: number = 0;
  fullName: string = '';
  company: string = '';
  fullAddress: string = '';
  email: string = '';
  phone: string = '';
  username: string = '';

  constructor( private gunService: GunService,private authService: AuthService, private otherSevice: OtherService,private router: Router ){}

  ngOnInit(): void {
    this.carts = this.gunService.getCarts();
    this.selectedShippingValue;
    this.selectedShippingPrice;
  }  
  
  async remove(idx: number) {
    this.carts.splice(idx, 1);
    this.gunService.saveCart(this.carts);
  }
  

  calculateTotal(): number {
    let total = 0;
    for (const item of this.carts) {
      if (item.price === 1775) {
        total += 350;
      } else if (item.price === 2375) {
        total += 450;
      } else {
        total += item.quantity * item.price;
      }
    }
    return total - this.selectedShippingPrice;
  }

  clearCart(): void {
    this.carts = [];
    this.gunService.saveCart(this.carts);
    window.location.reload();
  }

  updateShipping(event: any) {
    const selectedOptionId = event.target.value;
    switch(selectedOptionId) {
      case '1':
        this.selectedShippingValue = 'Giao hàng tiết kiệm ';
        this.selectedShippingPrice = 10;
        break;
      case '2':
        this.selectedShippingValue = 'Giao hàng nhanh ';
        this.selectedShippingPrice = 20;
        break;
      case '3':
        this.selectedShippingValue = 'Giao hàng hoả tốc ';
        this.selectedShippingPrice = 30;
        break;
      default:
        this.selectedShippingValue = '';
        this.selectedShippingPrice = 0;
      }
  }

  addOther(paymentMethod: string){
    if (this.authService.getCurrentUser() === undefined) {
      this.router.navigate(['/login']);
      alert('Bạn cần đăng nhập để thực hiện chức năng này');
    } else {
      let data = {
        id: 0,
        username: this.authService.getCurrentUser().username,
        fullName: this.fullName,
        company: this.company,
        fullAddress: this.fullAddress,
        email: this.email,
        phone: this.phone,
        items: this.carts,
        shipping: this.selectedShippingValue,
        totalAmount: this.calculateTotal(), 
        payment: paymentMethod
      };
      this.otherSevice.addOther(data).subscribe((res: any) => {
        console.log('res', res);
      });
      this.clearCart();
    }
  }
}
