import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  model: any = {};
  constructor(
     private spinner: NgxSpinnerService,
     private productService: ProductService ,
     private route : Router,
     private toaster : ToastrService) { }

  ngOnInit(): void { }

  handleFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      this.model.file = file;
      reader.readAsBinaryString(file);
    }
  }

  setData(form) {
    if (form) {
      this.spinner.show();
     const add =  this.productService.addProduct(this.model).subscribe(res => {
        this.spinner.hide();
        this.toaster.success('Product Add Success!');
        add.unsubscribe();
        this.route.navigate(['/product']);
      })
    }
  }
}
