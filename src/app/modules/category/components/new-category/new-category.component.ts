import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm: FormGroup;

  constructor( private fb : FormBuilder, private categoryService:CategoryService,
              private dialogRef : MatDialogRef<NewCategoryComponent> , private snackBar: MatSnackBar ){ 
    this.categoryForm = this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required]
    });
  }

  onSave(){
    let data ={
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }
    this.categoryService.saveCategory(data).subscribe(data=>{
      console.log(data);
      this.dialogRef.close(1);
      (e: any) => { 
        this.dialogRef.close(2);
        console.error(e) }
    })
  }

  onCancel(){
    this.dialogRef.close(3);
  }




  ngOnInit(): void {
  }

}
