import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = 'secure-user-token';
    let token = sessionStorage.getItem('token')
    const modifiedReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Access-Control-Expose-Headers', 'Content-Disposition')
        .set('content-type', 'application/json; charset=utf-8')
        .set('Access-Control-Allow-Origin', 'origen',),
    });
    return next.handle(modifiedReq);
  }
}
