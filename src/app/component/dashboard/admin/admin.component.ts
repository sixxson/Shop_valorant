import { Component, OnInit } from '@angular/core';
import { GunService } from '../../../models/gun.service';
import { Gun, Other, User } from '../../../models/classic';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../models/auth.service';
import { OtherService } from '../../../models/other.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  listProduct: Gun[] = []; 
  listUser: User[] = []; 
  listOther: any[] = []; 
  showAccount: boolean = false;
  showProduct: boolean = false;
  showOtherList: boolean = false;
  showAddProductFormFlag: boolean = false;
  showEditProductFormFlag: boolean = false;
  showEditUserFormFlag: boolean = false;
  editedProduct: Gun | null = null;
  editedUser: User | null = null;
  editedOther: Other | null = null;
  productForm: FormGroup | any;
  isSelected: boolean = true;
  displayCount = 6;
  currentPage = 1;

/*show form*/
  showAccountList() {
    this.showAccount = true;
    this.showProduct = false;
    this.showAddProductFormFlag = false;
    this.showEditUserFormFlag = false;
    this.showEditProductFormFlag = false;
    this.showOtherList = false;
  }
  showProductList() {
    this.showAccount = false;
    this.showProduct = true;
    this.showAddProductFormFlag = false;
    this.showEditUserFormFlag = false;
    this.showEditProductFormFlag = false;
    this.showOtherList = false;

  }
  showAddProductForm() {
    this.showAccount = false;
    this.showProduct = false;
    this.showAddProductFormFlag = true;
    this.showEditUserFormFlag = false;
    this.showEditProductFormFlag = false;
    this.showOtherList = false;
  }
  showEditUserForm() {
    this.showAccount = false;
    this.showProduct = false;
    this.showAddProductFormFlag = false;
    this.showEditUserFormFlag = true;
    this.showEditProductFormFlag = false;
    this.showOtherList = false;
  }
  showEditProductForm() {
    this.showAccount = false;
    this.showProduct = false;
    this.showAddProductFormFlag = false;
    this.showEditUserFormFlag = false;
    this.showEditProductFormFlag = true;
    this.showOtherList = false;
  }
  showOther() {
    this.showAccount = false;
    this.showProduct = false;
    this.showAddProductFormFlag = false;
    this.showEditUserFormFlag = false;
    this.showEditProductFormFlag = false;
    this.showOtherList = true;
  }

  constructor(
    private gunService: GunService, 
    private ActivatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private otherSevice: OtherService
    ) { }
  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
    this.loadOthers();
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      colordefault: ['', Validators.required],
      color1: ['', Validators.required],
      color2: ['', Validators.required],
      color3: ['', Validators.required],
      colorDefault: ['', Validators.required],
      color1_1: ['', Validators.required],
      color2_1: ['', Validators.required],
      color3_1: ['', Validators.required],
      productType: ['', Validators.required],
      productSet: ['', Validators.required],
      productTitle: ['', Validators.required]
    });
  }


/*product*/
  addProduct(product: Gun) {
    this.gunService.addSanPham(product).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }
  onSubmit() {
    if (this.productForm.invalid) { 
      return;
    }
    const formData = this.productForm.value; 
    const selectedStarInput = document.querySelector('input[name="productStar"]:checked') as HTMLInputElement;
    const selectedStar = selectedStarInput ? selectedStarInput.value : '';

    const selectedInputId = selectedStarInput ? selectedStarInput.id : '';
    const selectedLabel = selectedInputId ? document.querySelector(`label[for="${selectedInputId}"]`) : null;
    const selectedRanking = selectedLabel ? (selectedLabel.querySelector('img') as HTMLImageElement).src : '';

    const newProduct: Gun = {
      id: 0,
      name: formData.productName,
      imgURL: {
        colordefault: formData.colordefault,
        color1: formData.color1,
        color2: formData.color2,
        color3: formData.color3
      },
      colorURL: {
        colorDefault: formData.colorDefault,
        color1: formData.color1_1,
        color2: formData.color2_1,
        color3: formData.color3_1
      },
      price: parseFloat(formData.productPrice),
      set: formData.productSet,
      type: formData.productType,
      title: formData.productTitle,
      ranking: selectedRanking,
      star: parseInt(selectedStar)
    };
    this.gunService.addSanPham(newProduct).subscribe(() => {
      this.loadProducts();
    });
  }
  deleteProduct(productId: number) {
    this.gunService.deleteSanPham(productId).subscribe(() => {
      this.loadProducts();
    });
  }
  loadProducts() {
    this.gunService.getSanPham().subscribe(data => {
      this.listProduct = data as Gun[];
    });

    const id = this.ActivatedRoute.snapshot.params['id'];
    if (id) {
      this.gunService.getSanPhamById(id).subscribe((product: Gun) => {
        this.editedProduct = product;
      });
    }
  }
  editProduct(gunId: number) {
    this.gunService.getSanPhamById(gunId).subscribe((gun: Gun) => {
      this.editedProduct = gun;
      this.showEditProductForm();
    });
  }
  updateProduct() {
    if (this.editedProduct) {
      this.gunService.updateSanPham(this.editedProduct.id, this.editedProduct).subscribe(() => {
        this.loadProducts();
        this.editedProduct = null;
        this.showProductList();
      }, error => {
        console.error('Error updating product:', error);
      });
    }
  }
/*user*/
  loadUsers() {
    this.gunService.getUser().subscribe((data: User[]) => {
      this.listUser = data;
    });

    const id = this.ActivatedRoute.snapshot.params['id'];
    if (id) {
      this.loadUserById(id);
    }
  }
  loadUserById(userId: number) {
    this.gunService.getUserById(userId).subscribe((user: User) => {
      this.editedUser = user;
    });
  }
  deleteUser(userId: number) {
    this.gunService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); 
    });
  }
  onRoleChange(newRole: string) {
    if (this.editedUser) {
      this.editedUser.role = newRole;
    }
  }
  editUser(userId: number) {
    this.loadUserById(userId); 
    this.showEditUserForm(); 
  }
  updateUsers() {
    if (this.editedUser) {
      this.gunService.updateUser(this.editedUser.id, this.editedUser).subscribe(() => {
        this.loadUsers();
        this.editedUser = null;
        this.showEditUserForm();
      }, error => {
        console.error('Error updating Users:', error);
      });
    }
  }

  /* other */
  deleteOther(otherId: number) {
    this.otherSevice.deleteOther(otherId).subscribe(() => {
      this.loadOthers();
    });
  }
  loadOthers() {
    this.otherSevice.getOther().subscribe((data: any) => {
      this.listOther = data;
    });
  }
  updateOther(other: any) {
    if (other) {
      other.status = (document.getElementById('status') as HTMLSelectElement).value;
      this.otherSevice.updateOther(other.id, other).subscribe(() => {
        this.loadOthers();
        this.editedOther = null;
        this.showOther();
      }, error => {
        console.error('Error updating other:', error);
      });
    }
  }
  onChangeStatus(event: any) {
    if (this.editedOther) {
      this.editedOther.status = event.target.value;
    }
  }

/*logout*/
  logout() {
    this.authService.logout();
  }
  home(){
    this.router.navigate(['/home']);
  }

  /*number of items to display on a page*/
  get startItemIndex(): number {
    return (this.currentPage - 1) * this.displayCount;
  }
  get endItemIndex(): number {
    return this.currentPage * this.displayCount;
  }
  get gunsOnCurrentPage(): any[] {
    return this.listProduct.slice(this.startItemIndex, this.endItemIndex);
  }
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.listProduct.length / this.displayCount);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
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




}
