import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginaTipoTrabajadorRequest } from '../models/requests/listaPaginaTipoTrabajadorRequest';
import { ListaPaginaTipoTrabajadorResponse } from '../models/responses/listaPaginaTipoTrabajadorResponse';
import { RegistrarTipoTrabajadorRequest } from '../models/requests/registrarTipoTrabajadorRequest';
import { ModificarTipoTrabajadorRequest } from '../models/requests/modificarTipoTrabajadorRequest';
import { ObtenerTipoTrabajadorRequest } from '../models/requests/obtenerTipoTrabajadorRequest';
import { ObtenerTipoTrabajadorResponse } from '../models/responses/obtenerTipoTrabajadorResponse';
import { EliminarTipoTrabajadorRequest } from '../models/requests/eliminarTipoTrabajadorRequest';

@Injectable({
  providedIn: 'root'
})
export class TipoTrabajadorService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/TipoTrabajador`
  }


  public obtenerListaPaginaTipoTrabajador(params: ListaPaginaTipoTrabajadorRequest): Observable<HttpResponse<ListaPaginaTipoTrabajadorResponse>> {
    return this.http.post<ListaPaginaTipoTrabajadorResponse>(`${this.url}/obtenerListaTipoTrabajador`, params, {observe: 'response'});
  }

  public registrarTipoTrabajador(params: RegistrarTipoTrabajadorRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/registrarTipoTrabajador`, params, {observe: 'response'});
  }

  public modificarTipoTrabajador(params: ModificarTipoTrabajadorRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/modificarTipoTrabajador`, params, {observe: 'response'});
  }

  public obtenerTipoTrabajador(params: ObtenerTipoTrabajadorRequest): Observable<HttpResponse<ObtenerTipoTrabajadorResponse>> {
    return this.http.post<ObtenerTipoTrabajadorResponse>(`${this.url}/obtenerTipoTrabajador`, params, {observe: 'response'});
  }

  public eliminarTipoTrabajador(params: EliminarTipoTrabajadorRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarTipoTrabajador`, params, {observe: 'response'});
  }

}
