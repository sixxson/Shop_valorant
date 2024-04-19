import { Component, OnInit } from '@angular/core';
import { GunService } from '../../models/gun.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  carts: any = [];
  selectedColorURL: string = '';
  totalAmount: number = 0;
  constructor(private gunService: GunService) { }
  ngOnInit(): void {
    this.carts = this.gunService.getCarts();
  }
  async remove(idx: number) {
    this.carts.splice(idx, 1);
    this.gunService.saveCart(this.carts);
  }
  
  clearCart(): void {
    this.carts = [];
    this.gunService.saveCart(this.carts);
    window.location.reload();
  }
  calculateTotal(): number {
    let total = 0;
    for (const item of this.carts) {
      total += item.quantity * item.price;
    }
    return total;
  }
}
