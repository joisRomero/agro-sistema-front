import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidarPertenenciaCampaniaSociedadRequest } from '../models/requests/validarPertenenciaCampaniaSociedadRequest';

@Injectable({
  providedIn: 'root'
})
export class CampaniaService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/campania`
  }

  public validar(params: ValidarPertenenciaCampaniaSociedadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/validar`, params, {observe: 'response'});
  }

}
