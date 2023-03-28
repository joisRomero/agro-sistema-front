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
import { GeneralAlertErrorVars } from '../components/shared/general-alert-error/general-alert-error.vars';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private countRequest = 0;
  constructor(
    public loaderVars: LoaderComponentVars,
    public errorVars: GeneralAlertErrorVars,
    private jwtService: LocalStorageService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (!this.countRequest) {
    this.showLoader();
    // }
    this.countRequest++;
    // console.log(this.countRequest);
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if ([401].includes(error.status)) {
            if (this.jwtService.isLoggedIn()) {
              this.jwtService.signout();
            }
            this.hideLoader();
            this.showErrorModal("Su sesión a expirado.");
            sessionStorage.clear();
            this.router.navigate(['login']);
          }
          else{
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
          }
          return throwError(() => error);
        }),
        finalize(() => {
          this.countRequest--;
          // console.log(this.countRequest);
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
    this.errorVars.mostrar = true
    this.errorVars.texto = desc
  }
}
