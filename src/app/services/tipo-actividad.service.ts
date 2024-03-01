import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginaTipoActividadRequest } from '../models/requests/listaPaginaTipoActividadRequest';
import { ListaPaginaTipoActividadResponse } from '../models/responses/listaPaginaTipoActividadResponse';
import { RegistrarTipoActividadRequest } from '../models/requests/registrarTipoActividadRequest';
import { ModificarTipoActividadRequest } from '../models/requests/modificarTipoActividadRequest';
import { ObtenerTipoActividadRequest } from '../models/requests/obtenerTipoActividadRequest';
import { ObtenerTipoActividadResponse } from '../models/responses/obtenerTipoActividadResponse';
import { EliminarTipoActividadRequest } from '../models/requests/eliminarTipoActividadRequest';

@Injectable({
  providedIn: 'root'
})
export class TipoActividadService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/TipoActividad`
  }

  public obtenerListaPaginadaTipoActividad(params: ListaPaginaTipoActividadRequest): Observable<HttpResponse<ListaPaginaTipoActividadResponse>> {
    return this.http.post<ListaPaginaTipoActividadResponse>(`${this.url}/obtenerListaPaginadaTipoActividad`, params, {observe: 'response'});
  }

  public registrarTipoActividad(params: RegistrarTipoActividadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/registrarTipoActividad`, params, {observe: 'response'});
  }

  public modificarTipoActividad(params: ModificarTipoActividadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/modificarTipoActividad`, params, {observe: 'response'});
  }

  public obtenerTipoActividad(params: ObtenerTipoActividadRequest): Observable<HttpResponse<ObtenerTipoActividadResponse>> {
    return this.http.post<ObtenerTipoActividadResponse>(`${this.url}/obtenerTipoActividad`, params, {observe: 'response'});
  }

  public eliminarTipoActividad(params: EliminarTipoActividadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarTipoActividad`, params, {observe: 'response'});
  }

}
