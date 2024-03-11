import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginaAbonoRequest } from '../models/requests/listaPaginaAbonoRequest';
import { ListaPaginaAbonoResponse } from '../models/responses/listaPaginaAbonoResponse';
import { AgregarAbono } from '../models/requests/agregarAbono';
import { EditarAbonoRequest } from '../models/requests/editarAbonoRequest';
import { EliminarAbono } from '../models/requests/eliminarAbono';
import { ObtenerAbonoRequest } from '../models/requests/obtenerAbonoRequest';
import { ObtenerAbonoResponse } from '../models/responses/obtenerAbonoResponse';

@Injectable({
  providedIn: 'root'
})
export class AbonoService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/Abono`
  }

  public obtenerListaPaginadaAbono(params: ListaPaginaAbonoRequest): Observable<HttpResponse<ListaPaginaAbonoResponse>> {
    return this.http.post<ListaPaginaAbonoResponse>(`${this.url}/obtenerListaPaginadaAbono`, params, {observe: 'response'});
  }

  public agregarAbono(params: AgregarAbono): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/agregarAbono`, params, {observe: 'response'});
  }

  public editarAbono(params: EditarAbonoRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/editarAbono`, params, {observe: 'response'});
  }

  public obtenerAbono(params: ObtenerAbonoRequest): Observable<HttpResponse<ObtenerAbonoResponse>> {
    return this.http.post<ObtenerAbonoResponse>(`${this.url}/obtenerAbono`, params, {observe: 'response'});
  }

  public eliminarAbono(params: EliminarAbono): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarAbono`, params, {observe: 'response'});
  }
}