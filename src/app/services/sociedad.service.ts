import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginadaSociedadesRequest } from '../models/requests/listaPaginadaSociedadesRequest';
import { ListaPaginadaSociedadesResponse } from '../models/responses/listaPaginadaSociedadesResponse';

@Injectable({
  providedIn: 'root'
})
export class SociedadService {

  private url: string = "";

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.apiUrl}/api/v1/sociedad`;
  }

  public obtenerListaPaginadaSociedades(params: ListaPaginadaSociedadesRequest): Observable<HttpResponse<ListaPaginadaSociedadesResponse>> {
    return this.http.post<ListaPaginadaSociedadesResponse>(`${this.url}/obtenerListaPaginadaSociedades`, params, {observe: 'response'});
  }

}
