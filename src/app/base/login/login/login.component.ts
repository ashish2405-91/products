import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appConstant: any;
  model: any = {};
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('loginInfo')) {
      this.router.navigate(['product']);
    }
    this.appConstant = environment;
  }
  login(form) {
    if (form) {
      this.model.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjI3MTk1MDU0LCJpYXQiOjE2MjIwMTEwNTR9.WqBLbqgaJOAMeUAAqn_6nZsi7Zf0M3yexM9QKTYYnsQ";
      const remember_me = CryptoJS.AES.encrypt(
        JSON.stringify(this.model),
        environment.secretKey
      ).toString();
      localStorage.setItem("loginInfo", remember_me);
      this.router.navigate(['product']);
    }

  }
}
