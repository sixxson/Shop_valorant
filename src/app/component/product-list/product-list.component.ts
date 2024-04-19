import { Component, OnInit } from '@angular/core';
import { Gun } from '../../models/classic';
import { GunService } from '../../models/gun.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  filteredProducts: any[] = [];
  listProduct: Gun[] = [];
  displayCount = 9;
  currentPage = 1;
  showAllProducts: boolean = true;
  constructor(private gunService: GunService) { }

  get startItemIndex(): number {
    return (this.currentPage - 1) * this.displayCount;
  }

  get endItemIndex(): number {
    return this.currentPage * this.displayCount;
  }

  get gunsOnCurrentPage(): any[] {
    if (this.listProduct) {
      return this.listProduct.slice(this.startItemIndex, this.endItemIndex);
    } else {
      return [];
    }
  }

  getPageNumbers(): number[] {
    if (this.listProduct) {
      const pageCount = Math.ceil(this.listProduct.length / this.displayCount);
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    } else {
      return [];
    }
  }
  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage(): void {
    if (this.currentPage < this.getPageNumbers().length) {
      this.currentPage++;
    }
  }
  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.listProduct = this.listFilter ? this.performFilter(this.listFilter) : this.listProduct;
  }
  ngOnInit(): void {
    this.gunService.getSanPham().subscribe(data => {
      this.listProduct = data as Gun[];
    });
  }
  performFilter(filterBy: string): Gun[] {
    // Chuyển filterBy sang chữ thường để tìm kiếm không phân biệt hoa thường
    filterBy = filterBy.toLocaleLowerCase();
    // Lọc sản phẩm dựa trên tên sản phẩm và trả về mảng sản phẩm mới sau khi lọc 
    return this.listProduct.filter((product: Gun) =>
      product.name.toLocaleLowerCase().includes(filterBy)
    );
  }
  filterProducts(type: string) {
    if (type === '') {
      // Nếu loại là '*', hiển thị tất cả sản phẩm
      this.showAllProducts = true;
      this.filteredProducts = this.listProduct;
    } else {
      // Nếu không, lọc sản phẩm dựa trên loại sản phẩm và loại bỏ sản phẩm có loại trùng khớp với loại đã chọn
      this.filteredProducts = this.listProduct.filter((product: Gun) => product.type === type);
    }
    this.showAllProducts = false;
  }

  reloadPage() {
    window.location.reload();
   }
}
