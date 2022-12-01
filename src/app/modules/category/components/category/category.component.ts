import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) {   }

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



}



export interface CategoryElement{
  description:String;
  id:number;
  name:String;
}


