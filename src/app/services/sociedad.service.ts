import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginadaSociedadesRequest } from '../models/requests/listaPaginadaSociedadesRequest';
import { ListaPaginadaSociedadesResponse } from '../models/responses/listaPaginadaSociedadesResponse';
import { ObtenerIntegrantesSociedadRequest } from '../models/requests/obtenerIntegrantesSociedadRequest';
import { ObtenerIntegrantesSociedadResponse } from '../models/responses/obtenerIntegrantesSociedadResponse';
import { ListaPaginaCampaniasSocidadResponse } from '../models/responses/listaPaginaCampaniasSocidadResponse';
import { ListaPaginaCampaniasSocidadRequest } from '../models/requests/listaPaginaCampaniasSocidadRequest';

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

  public obtenerIntegrantesSociedad(params: ObtenerIntegrantesSociedadRequest): Observable<HttpResponse<ObtenerIntegrantesSociedadResponse[]>> {
    return this.http.post<ObtenerIntegrantesSociedadResponse[]>(`${this.url}/obtenerIntegrantesSociedad`, params, {observe: 'response'});
  }

  public obtenerListaPaginaCampaniasSocidad(params: ListaPaginaCampaniasSocidadRequest): Observable<HttpResponse<ListaPaginaCampaniasSocidadResponse>> {
    return this.http.post<ListaPaginaCampaniasSocidadResponse>(`${this.url}/obtenerListaPaginaCampaniasSocidad`, params, {observe: 'response'});
  }

}
