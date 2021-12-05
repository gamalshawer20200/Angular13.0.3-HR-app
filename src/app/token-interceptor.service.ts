import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginComponent } from './user/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private loginComponent: LoginComponent
  ) { }

  intercept(req: any,next: any) {
    
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginComponent.getToken()}`
      }
    })
    return next.handle(tokenizedRequest)
  }
}
