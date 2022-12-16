import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ConfirmComponent>,
              @Inject (MAT_DIALOG_DATA) public data:any,
              private categoryService:CategoryService,private productService:ProductService) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close(3);
  }

  delete(){
    if(this.data != null){

        if(this.data.module == "category"){
          this.categoryService.deleteCategory(this.data.id)
          .subscribe(
            (data:any) => { this.dialogRef.close(1) },
            (error:any) => { this.dialogRef.close(2) }    
          )
        }else if(this.data.module == "product"){
          this.productService.deleteProduct(this.data.id)
          .subscribe(
            (data:any) => { this.dialogRef.close(1) },
            (error:any) => { this.dialogRef.close(2) }    
          )
        }
    }else{
      this.dialogRef.close(2) ;
    }
  }




}
