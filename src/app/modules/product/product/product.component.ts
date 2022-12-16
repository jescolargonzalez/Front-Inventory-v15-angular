import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProductService } from '../../shared/services/product.service';
import { UtilService } from '../../shared/services/util.service';
import { NewProductComponent } from '../new-product/new-product.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  isAdmin:any;

  constructor(private productService: ProductService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private util: UtilService) { }

  ngOnInit(): void {  
    this.getProducts();
    this.isAdmin = this.util.isAdmin();
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
        listProduct.forEach((element: ProductElement) =>{
        //element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+element.picture;
        dateProduct.push(element);
      });
    //Setting datasource
    this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
    this.dataSource.paginator = this.paginator;
    }
  }

  //mensaje inferior para el usuario.
  openSnackBar(message:string,action:string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message,action, {
      duration:2000
    })
  }
  edit(id:number,name:string,price:number,cantidad:number,category:any){
    const dialogRef = this.dialog.open( NewProductComponent , {
      width: '450px',
      data:{id:id,name:name,price:price,cantidad:cantidad,category:category}
    });

    dialogRef.afterClosed().subscribe( (result:any)=> {
      if(result == 1){
        //mensaje OK
        this.openSnackBar("Producto Actualizado Correctamente!","OK");
        this.getProducts();
      }else if(result == 2){
        //mensaje ERROR
        this.openSnackBar("Ups! Algo salio FATAL al editar el producto....","ERROR");
      }else if(result == 3){
        //mensaje por usuario imbecil
        this.openSnackBar("Me da ami que estas demasiado PEDO que ya ni sabes ni que haces aqui","HumanDestroyed!");
      }        
    });
  }

  openProductDialog(){
    const dialogRef = this.dialog.open( NewProductComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe( (result:any)=> {
      if(result == 1){
        //mensaje OK
        this.openSnackBar("Producto Guardado Correctamente!","OK");
        this.getProducts();
      }else if(result == 2){
        //mensaje ERROR
        this.openSnackBar("Ups! Algo salio FATAL al guardar el producto....","ERROR");
      }else if(result == 3){
        //mensaje por usuario imbecil
        this.openSnackBar("Me da ami que estas demasiado PEDO que ya ni sabes ni que haces aqui","HumanDestroyed!");
      }        
    });
  }

  delete(id:any){
        const dialogRef = this.dialog.open( ConfirmComponent , {
        width: '450px',
        data:{id:id,module:"product"}
      });

      dialogRef.afterClosed().subscribe( (result:any)=> {
        if(result == 1){
          //mensaje OK
          this.openSnackBar("Producto Eliminado Correctamente!","OK");
          this.getProducts();
        }else if(result == 2){
          //mensaje ERROR
          this.openSnackBar("Ups! Algo salio FATAL al ELIMINAR el producto....","ERROR");
        }else if(result == 3){
          //mensaje por usuario imbecil
          this.openSnackBar("Me da ami que estas demasiado PEDO que ya ni sabes ni que haces aqui","HumanDestroyed!");
        }        
      });
    }

    buscar(name: any){
      if ( name.length === 0){
        return this.getProducts();
      }
  
      this.productService.getProductByName(name)
          .subscribe( (resp: any) =>{
            this.processProductResponse(resp);
          })
    }

}



export interface ProductElement{
  id: number;
  name: string;
  price: number;
  cantidad: number;
  category: any;
  picture: any;
}
