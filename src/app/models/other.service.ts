import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Other } from './classic';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http:HttpClient) { }

  getOther(): Observable<any>{
    return this.http.get('http://localhost:3000/Other');
  }

  updateOther(id: number, other: Other): Observable<any> {
    const url = `http://localhost:3000/Other/${id}`;
    return this.http.put(url, other);
}

  deleteOther(id:any){
    return this.http.delete('http://localhost:3000/Other/'+id);
  }

  addOther(data:any): Observable<any> {
    return this.http.post('http://localhost:3000/Other',data);
  }

  getOtherById(id:any): Observable<any>{
    const url = `http://localhost:3000/Other/${id}`;
        return this.http.get<Other>(url);
  }

}
