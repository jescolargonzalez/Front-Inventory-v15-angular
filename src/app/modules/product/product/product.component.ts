import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {  
    this.getProducts();
  }

  displayedColumns: String[] =['id','name','precio','cantidad','category','picture','actions'];  
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(){
    this.productService.getProducts().subscribe(
      (data:any) => {
        console.log("respuesta de productos: ", data);
        this.processProductResponse(data);
    },(error:any) => {
        console.log("error en productos: ", error);
    })
  }

  processProductResponse(resp:any){
    const dateProduct: ProductElement[] = [];

    if( resp.metadata[0].code == "00"){
      let listProduct = resp.productResponse.products;
      console.log("waaaaaaaaaaaaa");
      listProduct.forEach((element: ProductElement) =>{
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+element.picture;
        dateProduct.push(element);
      });

    //Setting datasource
    this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
    this.dataSource.paginator = this.paginator;

    }

  }


}

export interface ProductElement{
  id: number;
  name: string;
  precio: number;
  cantidad: number;
  category: any;
  picture: any;
}
