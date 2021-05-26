import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
show :boolean = false
  constructor( private route : Router,
    private toaster : ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('loginInfo')){
      this.show = true;
    }
  }
  logout(){
localStorage.removeItem('loginInfo');
this.toaster.success('Logout Successfully!')
this.route.navigate(['/']);
  }
}
