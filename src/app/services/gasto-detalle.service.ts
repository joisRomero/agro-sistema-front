import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginaGastoDetalleRequest } from '../models/requests/listaPaginaGastoDetalleRequest';
import { ListaPaginaGastoDetalleResponse } from '../models/responses/listaPaginaGastoDetalleResponse';
import { AgregarGastoDetalleRequest } from '../models/requests/agregarGastoDetalleRequest';
import { EditarGastoDetalleRequest } from '../models/requests/editarGastoDetalleRequest';
import { ObtenerGastoDetalleRequest } from '../models/requests/obtenerGastoDetalleRequest';
import { ObtenerGastoDetalleResponse } from '../models/responses/obtenerGastoDetalleResponse';
import { EliminarGastoDetalleRequest } from '../models/requests/eliminarGastoDetalleRequest';

@Injectable({
  providedIn: 'root'
})
export class GastoDetalleService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/GastoDetalle`
  }

  public obtenerListaPaginadaGastoDetalle(params: ListaPaginaGastoDetalleRequest): Observable<HttpResponse<ListaPaginaGastoDetalleResponse>> {
    return this.http.post<ListaPaginaGastoDetalleResponse>(`${this.url}/obtenerListaPaginadaGastoDetalle`, params, {observe: 'response'});
  }

  public agregarGastoDetalle(params: AgregarGastoDetalleRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/agregarGastoDetalle`, params, {observe: 'response'});
  }

  public editarGastoDetalle(params: EditarGastoDetalleRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/editarGastoDetalle`, params, {observe: 'response'});
  }

  public obtenerGastoDetalle(params: ObtenerGastoDetalleRequest): Observable<HttpResponse<ObtenerGastoDetalleResponse>> {
    return this.http.post<ObtenerGastoDetalleResponse>(`${this.url}/obtenerGastoDetalle`, params, {observe: 'response'});
  }

  public eliminarGastoDetalle(params: EliminarGastoDetalleRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarGastoDetalle`, params, {observe: 'response'});
  }

}
