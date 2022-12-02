import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/component/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              public dialog: MatDialog, private snackBar:MatSnackBar) {   }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: String[] =['id','name','description','action'];  
  dataSource = new MatTableDataSource<CategoryElement>();
  
  getCategories(){
    this.categoryService.getCategories()
    .subscribe ( (data:any) => {
      console.log("respuesta categories",data);
      this.processCategoriesResponse(data);
      {console.error}
    })
  }


  processCategoriesResponse(resp:any){
    const dataCategory: CategoryElement[] = [];
    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category;
        listCategory.forEach( (element: CategoryElement) => {
          dataCategory.push(element);
        });
        this.dataSource=new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

  //Agregar new categoria con ventana emergente
  openCategoryDialog(){
    const dialogRef = this.dialog.open( NewCategoryComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe( (result:any)=> {
      if(result == 1){
        //mensaje OK
        this.openSnackBar("Categoria Guardada Correctamente!","OK");
        this.getCategories();
      }else if(result == 2){
        //mensaje ERROR
        this.openSnackBar("Ups! Algo salio FATAL....","ERROR");
      }else if(result == 3){
        //mensaje por usuario imbecil
        this.openSnackBar("Me da ami que estas demasiado PEDO que ya ni sabes ni que haces aqui","HumanDestroyed!");
      }        
    });
  }
  //Actualizar new categoria con ventana emergente
  edit(id:number,name:string,description:string){
    const dialogRef = this.dialog.open( NewCategoryComponent , {
      width: '450px',
      data:{ id:id, name: name, description: description }
    });

    dialogRef.afterClosed().subscribe( (result:any)=> {
      if(result == 1){
        //mensaje OK
        this.openSnackBar("Categoria Actualizada Correctamente!","OK");
        this.getCategories();
      }else if(result == 2){
        //mensaje ERROR
        this.openSnackBar("Ups! Algo salio FATAL en la actualizacion....","ERROR");
      }else if(result == 3){
        //mensaje ERROR
        this.openSnackBar("Te has arrepentido humano?....","ERROR HUMANO");
      }  
    });
  }
  //mensaje inferior para el usuario.
  openSnackBar(message:string,action:string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message,action, {
      duration:2000
    })
  }


  delete(id:any){
    const dialogRef = this.dialog.open( ConfirmComponent , {
      
      data:{ id:id }
    });

    dialogRef.afterClosed().subscribe( (result:any)=> {
      if(result == 1){
        //mensaje OK
        this.openSnackBar("Categoria ELIMINADA Correctamente!","OK");
        this.getCategories();
      }else if(result == 2){
        //mensaje ERROR
        this.openSnackBar("Ups! Algo salio FATAL en la ELIMINACION....","ERROR");
      }else if(result == 3){
        //mensaje CANCELAR
        this.openSnackBar("Te has arrepentido humano?....","ERROR HUMANO");
      }  
    });
  }


}


export interface CategoryElement{
  description:String;
  id:number;
  name:String;
}


