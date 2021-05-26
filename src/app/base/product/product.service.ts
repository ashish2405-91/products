import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }


  GetUserList(data:any):Observable<any>{
    if(!data.title){ data.title = '';}
     return  this.http.get('https://fakestoreapi.com/products/?title='+data.title);
  }
  addProduct(data:any):Observable<any>{
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('price',data.price);
    formData.append('description',data.description);
    formData.append('category',data.category);
    formData.append('image',data.image);
    return this.http.post('https://fakestoreapi.com/products/' , formData);
  }
}
