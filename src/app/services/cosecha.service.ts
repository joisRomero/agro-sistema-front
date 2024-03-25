import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginadaCosechasRequest } from '../models/requests/listaPaginadaCosechasRequest';
import { ListaPaginadaCosechasResponse } from '../models/responses/listaPaginadaCosechasResponse';
import { AgregarCosechaRequest } from '../models/requests/agregarCosechaRequest';
import { EditarCosechaRequest } from '../models/requests/editarCosechaRequest';
import { EliminarCosechaRequest } from '../models/requests/eliminarCosechaRequest';
import { ObtenerCosechaRequest } from '../models/requests/obtenerCosechaRequest';
import { ObtenerCosechaResponse } from '../models/responses/obtenerCosechaResponse';

@Injectable({
  providedIn: 'root'
})
export class CosechaService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/cosecha`
  }

  public obtenerListaCosechas(params: ListaPaginadaCosechasRequest): Observable<HttpResponse<ListaPaginadaCosechasResponse>> {
    return this.http.post<ListaPaginadaCosechasResponse>(`${this.url}/obtenerListaPaginadaCosechas`, params, {observe: 'response'});
  }

  public agregarCosecha(params: AgregarCosechaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/agregarCosecha`, params, {observe: 'response'});
  }

  public editarCosecha(params: EditarCosechaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/editarCosecha`, params, {observe: 'response'});
  }

  public eliminarCosecha(params: EliminarCosechaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarCosecha`, params, {observe: 'response'});
  }

  public obtenerCosecha(params: ObtenerCosechaRequest): Observable<HttpResponse<ObtenerCosechaResponse>> {
    return this.http.post<ObtenerCosechaResponse>(`${this.url}/obtenerCosecha`, params, {observe: 'response'});
  }
}
