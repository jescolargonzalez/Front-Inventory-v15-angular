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
    
    //Guardar Categoria.
    saveCategory(body:any){
      const endpoint = `${base_url}/categories`;
      return this.http.post(endpoint,body);
    }

    
    //Actualizar Categoria.
    updateCategory(body:any,id:any){
      const endpoint = `${base_url}/categories/${id}`;
      return this.http.put(endpoint,body);
    }


    //Eliminar Categoria.
    deleteCategory(id:any){
      const endpoint = `${base_url}/categories/${id}`;
      return this.http.delete(endpoint);
    }


     //Obtener categorias por id.
    getCategoriesById(id:any){
      const endpoint = `${base_url}/categories/${id}`;
      return this.http.get(endpoint);
    }
  
  }






