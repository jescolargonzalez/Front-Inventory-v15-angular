import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
const base_url= environment.base_url

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

//Get all the products
  getProducts() {
    const endpoint = `${base_url}/products`;
    return this.http.get(endpoint);
  }




}
