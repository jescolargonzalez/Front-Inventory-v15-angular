import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }
    //Obtener categorias.
    getCategories() {
      const endpoint = `${base_url}/categories`;
      return this.http.get(endpoint);
    }
    
    //Guardar Categorias.
    saveCategory(body:any){
      const endpoint = `${base_url}/categories`;
      return this.http.post(endpoint,body);
    }
  
  }






