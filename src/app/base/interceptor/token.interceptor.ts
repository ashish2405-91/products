import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  user: any;
  constructor(
    private alertservice: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.user = JSON.parse(
      CryptoJS.AES.decrypt(localStorage.getItem("loginInfo"), environment.secretKey).toString(
        CryptoJS.enc.Utf8
      )
    );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenReq = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.user.token
      }
    })
    return next.handle(tokenReq).pipe(
      catchError((err) => {
        this.handleError(err);
        return of(null);
      })
    )
  }
  handleError(err: any): any {
    if (err) {
      this.alertservice.error(err.error.message);
      this.spinnerService.hide();
    }
    if (err.status === 422) {
      this.alertservice.error(err.error.message);
    } else if (err.status === 404) {
      this.alertservice.error(err.error.message);
    } else if (err.status === 500) {
      this.alertservice.error(err.error.message);
    } else if (err.status === 0) {
      this.alertservice.error("CONNECTION REFUSED");
    } else if (err.status === 401) {
      this.log_out(err.status);
    }
    return throwError(err);
  }
  log_out(status: any): void {
    if (status === 403 || status === 401) {
      localStorage.removeItem("loginInfo");
      if (status === 401) {
        this.alertservice.error(
          "error",
          "Somthing went wrong please login again."
        );
      }
    }
  }
}
