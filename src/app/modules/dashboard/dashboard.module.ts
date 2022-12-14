import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';



@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        CategoryModule,
        ProductModule
    ]
})
export class DashboardModule { }
