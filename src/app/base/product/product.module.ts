import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductService } from "./product.service";
import { TokenInterceptor } from "./../interceptor/token.interceptor";
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ProductComponent, AddComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule
  ],providers:[ProductService,
    {provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi: true}
  ]
})
export class ProductModule { }
