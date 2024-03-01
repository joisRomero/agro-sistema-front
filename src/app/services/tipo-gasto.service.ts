import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginaTipoGastoRequest } from '../models/requests/listaPaginaTipoGastoRequest';
import { ListaPaginaTipoGastoResponse } from '../models/responses/listaPaginaTipoGastoResponse';
import { AgregarTipoGastoRequest } from '../models/requests/agregarTipoGastoRequest';
import { EditarTipoGastoRequest } from '../models/requests/editarTipoGastoRequest';
import { ObtenerTipoGastoRequest } from '../models/requests/obtenerTipoGastoRequest';
import { ObtenerTipoGastoResponse } from '../models/responses/obtenerTipoGastoResponse';
import { EliminarTipoGastoRequest } from '../models/requests/eliminarTipoGastoRequest';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/TipoGasto`
  }

  public obtenerListaPaginadaTipoGasto(params: ListaPaginaTipoGastoRequest): Observable<HttpResponse<ListaPaginaTipoGastoResponse>> {
    return this.http.post<ListaPaginaTipoGastoResponse>(`${this.url}/obtenerListaPaginadaTipoGasto`, params, {observe: 'response'});
  }

  public agregarTipoGasto(params: AgregarTipoGastoRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/agregarTipoGasto`, params, {observe: 'response'});
  }

  public editarTipoGasto(params: EditarTipoGastoRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/editarTipoGasto`, params, {observe: 'response'});
  }

  public obtenerTipoGasto(params: ObtenerTipoGastoRequest): Observable<HttpResponse<ObtenerTipoGastoResponse>> {
    return this.http.post<ObtenerTipoGastoResponse>(`${this.url}/obtenerTipoGasto`, params, {observe: 'response'});
  }

  public eliminarTipoGasto(params: EliminarTipoGastoRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarTipoGasto`, params, {observe: 'response'});
  }

}
