import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Gun, User } from './classic';

@Injectable({
    providedIn: 'root'
})
export class GunService {
    public productlist = new BehaviorSubject<any>([]);
    public cartlist: any[] = [];

    constructor(private http: HttpClient) { }
    // Giỏ hàng (thêm, xóa, lấy danh sách sản phẩm)
    getCarts() {
        try {
            if (typeof localStorage !== 'undefined') {
                let cartJson = localStorage.getItem('cart');
                if (cartJson) {
                    return JSON.parse(cartJson);
                }
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
        return [];
    }
    saveCart(carts: any) {
        let cartJson = JSON.stringify(carts);
        localStorage.setItem('cart', cartJson);
    }

    clearCart() {
        // Xóa tất cả sản phẩm khỏi giỏ hàng
        this.cartlist = [];
        // Cập nhật lại giỏ hàng
        this.productlist.next([...this.cartlist]);
      }

    listProducts() {
        return this.productlist.asObservable();
    }

    getSanPham(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/Gun');
    }

    addSanPham(product: any): Observable<any> {
        return this.http.post('http://localhost:3000/Gun', product);
    }

    getSanPhamById(id: number): Observable<Gun> {
        const url = `http://localhost:3000/Gun/${id}`;
        return this.http.get<Gun>(url);
    }

    updateSanPham(productId: number, product: Gun): Observable<any> {
        const url = `http://localhost:3000/Gun/${productId}`;
        return this.http.put(url, product);
    }

    deleteSanPham(productId: number): Observable<any> {
        const url = `http://localhost:3000/Gun/${productId}`;
        return this.http.delete(url);
    }

    getUser(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/User');
    }

    getUserById(id: number): Observable<any> {
        const url = `http://localhost:3000/User/${id}`;
        return this.http.get<User>(url);
    }

    deleteUser(userId: number): Observable<any> {
        const url = `http://localhost:3000/User/${userId}`;
        return this.http.delete(url);
    }

    updateUser(userId: number, user: User): Observable<any> {
        const url = `http://localhost:3000/User/${userId}`;
        return this.http.put(url, user);
    }
}
