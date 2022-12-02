import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  estadoForm: string = "Agregar";

  constructor( private fb : FormBuilder, private categoryService:CategoryService,
              private dialogRef : MatDialogRef<NewCategoryComponent> ,
              @Inject(MAT_DIALOG_DATA) public data:any){ 

    this.categoryForm = this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required]
    });

    //relleno formulario update
    if(data != null){
      this.updateForm(data);
      this.estadoForm = "Actualizar";
    }

  }




  onSave(){
    let data ={
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if(this.data != null){
      //ya no crea registro , ahora actualiza
      this.categoryService.updateCategory(data,this.data.id).subscribe({
        next: (data:any) => {
          this.dialogRef.close(1);
        () => this.dialogRef.close(2);
        console.warn(Error);
        
        }
      })
    }else{
      //crea registro
      this.categoryService.saveCategory(data).subscribe(data=>{
        console.log(data);
        this.dialogRef.close(1);
        (e: any) => { 
          this.dialogRef.close(2);
          console.error(e) }
      })
    }

  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data:any){
    this.categoryForm = this.fb.group({
      name:[data.name,Validators.required],
      description:[data.description,Validators.required]
    });
  };



  ngOnInit(): void {
  }

}
