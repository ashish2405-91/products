import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productList: any;
  private subject  = new Subject<any>();
  constructor(private productService: ProductService, private spinner: NgxSpinnerService) { }
  search:any={};
  ngOnInit(): void {
    this.subject.pipe(debounceTime(500)).subscribe((res)=>{
      this.search.title = res;
this.getList();
    })
    this.getList();
  }
  getList() {
    this.spinner.show();
    const service = this.productService.GetUserList(this.search).subscribe(res => {
      if (res) {
        this.productList = res;
      }
      this.spinner.hide();
      service.unsubscribe();
    })
  }
  searchData(value){
  this.subject.next(value);
  }
}
