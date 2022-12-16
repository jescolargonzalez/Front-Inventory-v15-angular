import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewCategoryComponent } from '../../category/components/new-category/new-category.component';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';

export interface Category{
  id: number;
  name: String,
  precio: number,
  cantidad: number,
  category: Category,
  picture: any
};

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm: FormGroup;
  estadoForm: string = "Agregar";
  categories: Category[] = [];
  selectedFile: any;
  nameImg:String="";

  constructor( private fb : FormBuilder, private categoryService: CategoryService,
              private productService: ProductService, private dialogRef : MatDialogRef<NewCategoryComponent> ,
    @Inject(MAT_DIALOG_DATA) public data:any){ 
      this.productForm = this.fb.group({
        name:['',Validators.required],
        precio:['',Validators.required],
        cantidad:['',Validators.required],
        category:['',Validators.required],
        picture:['',Validators.required]
      })
      if(data!=null){
        this.updateForm(data);
        this.estadoForm = "actualizar";
      }
    }

  ngOnInit(): void {
    this.getCategories();
  }


  onSave(){
    let data ={
      name:this.productForm.get('name')?.value,
      precio:this.productForm.get('precio')?.value,
      cantidad:this.productForm.get('cantidad')?.value,
      category:this.productForm.get('category')?.value,
      picture:this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture',data.picture,data.picture.name);
    uploadImageData.append('name',data.name);
    uploadImageData.append('price',data.precio);
    uploadImageData.append('cantidad',data.cantidad);
    uploadImageData.append('categoryId',data.category);

    if(this.data != null){
      //update the product
      this.productService.updateProduct(uploadImageData,this.data.id).subscribe( (data:any)=>{
        this.dialogRef.close(1);
      }, (error:any) => {
      this.dialogRef.close(2);
    })
    }else{  
      //llamamos al servicio guardar producto
      this.productService.saveProduct(uploadImageData).subscribe( (data:any)=>{
        this.dialogRef.close(1);
      }, (error:any) => {
      this.dialogRef.close(2);
    })
    }
    



  }

  onCancel(){
    this.dialogRef.close(3);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe( (data:any) => {
      this.categories = data.categoryResponse.category;

    },(error:any)=>{
      console.log("ERROR AL CONSULTAR CATEGORIAS");
    })
  }

  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.nameImg=event.target.files[0].name;
  }


  updateForm(data:any){
    console.log(data);
    this.productForm = this.fb.group({
      name:[data.name,Validators.required],
      precio:[data.price,Validators.required],
      cantidad:[data.cantidad,Validators.required],
      category:[data.category.id,Validators.required],
      picture:['',Validators.required]
    })
  }

}
