import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoaderComponentVars } from '../components/shared/loader/loader.component.vars';
import { AlertErrorVars } from '../components/shared/alert-error/alert-error.component.vars';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private countRequest = 0;
  constructor(
    public loaderVars: LoaderComponentVars,
    public errorVars: AlertErrorVars,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (!this.countRequest) {
    this.showLoader();
    // }
    this.countRequest++;
    console.log(this.countRequest);
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.hideLoader();
            this.showErrorModal("Ocurrió un error");
          } else {
            this.hideLoader();
            this.showErrorModal("Ocurrió un error");
            if (error.error.mensaje.descripcion) {
              this.showErrorModal(error.error.mensaje.descripcion)
            }
          }
          return throwError(() => error);
        }),
        finalize(() => {
          this.countRequest--;
          console.log(this.countRequest);
          if (!this.countRequest) {
            this.hideLoader();
          }
        }))

  }
  private showLoader(): void {
    this.loaderVars.showLoader = true;
  }
  private hideLoader(): void {
    this.loaderVars.showLoader = false;
  }
  private showErrorModal(desc: string): void {
    this.errorVars.showAlert = true
    this.errorVars.description = desc
  }
}
