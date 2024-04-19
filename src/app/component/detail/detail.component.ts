import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gun } from '../../models/classic';
import { GunService } from '../../models/gun.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  products: Gun[] = [];
  productDetails: Gun | undefined;
  id!: number;
  displayCount = 3;
  filteredProducts: Gun[] = [];
  iguns: any[] = [];
  selectedColorURL = '';
  isClicked = false;
  carts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private gunService: GunService,
  ) { }

  ngOnInit(): void {
    // lay du lieu tu gun tu gunService
    this.gunService.getSanPham().subscribe(data => {
      this.products = data as Gun[];
      // lay id tu url
      this.route.paramMap.subscribe(params => {
        this.id = parseInt(params.get('id') || '');
        // tim san pham theo id
        this.productDetails = this.products.find((product: Gun) => product.id === this.id);
        if (this.productDetails) {
          // lay imgURL tu productDetails
          if (!this.selectedColorURL) {
            // neu selectedColorURL = '' thi lay imgURL.colordefault
            this.selectedColorURL = this.productDetails.imgURL.colordefault || '';
          }
          // lay iguns tu productDetails
          this.filteredProducts = [...this.products];
          // Gọi hàm shuffle sau khi dữ liệu đã được tải hoàn toàn
          this.shuffle(this.products);
        }
      });
    });
    this.carts = this.gunService.getCarts();
  }

  shuffle(array: Gun[]): Gun[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  changeColor(colorURL: string): void {
    this.selectedColorURL = colorURL;
    this.isClicked = true;
  }

  buyNow(product: any): void {
    let same = this.carts.findIndex((item: any) => item.id === product.id);
    if (same >= 0) {
      this.carts[same].quantity += 1;
    } else {
      let cartItem: any = {
        id: product.id,
        price: product.price,
        img: this.selectedColorURL,
        name: product.name,
        set: product.set,
        quantity: 1,
      };
      this.carts.push(cartItem);
    }
    this.gunService.saveCart(this.carts);
  }

}
