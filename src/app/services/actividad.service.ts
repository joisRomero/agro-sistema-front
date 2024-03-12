import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginaActividadRequest } from '../models/requests/listaPaginaActividadRequest';
import { ListaPaginaActividadResponse } from '../models/responses/listaPaginaActividadResponse';
import { AgregarActividadTrabajadorRequest } from '../models/requests/agregarActividadTrabajadorRequest';
import { ModificarActividadTrabajadorGastosRequest } from '../models/requests/modificarActividadTrabajadorGastosRequest';
import { ListarDetalleActividadRequest } from '../models/requests/listarDetalleActividadRequest';
import { ListarDetalleActividadResponse } from '../models/responses/listarDetalleActividadResponse';
import { EliminarActividadRequest } from '../models/requests/eliminarActividadRequest';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/Actividad`
  }

  public listarActividades(params: ListaPaginaActividadRequest): Observable<HttpResponse<ListaPaginaActividadResponse>> {
    return this.http.post<ListaPaginaActividadResponse>(`${this.url}/listarActividades`, params, {observe: 'response'});
  }

  public agregarActividadTrabajadorGastos(params: AgregarActividadTrabajadorRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/agregarActividadTrabajadorGastos`, params, {observe: 'response'});
  }

  public modificarActividadTrabajadorGastos(params: ModificarActividadTrabajadorGastosRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/modificarActividadTrabajadorGastos`, params, {observe: 'response'});
  }

  public listarDetalleActividad(params: ListarDetalleActividadRequest): Observable<HttpResponse<ListarDetalleActividadResponse>> {
    return this.http.post<ListarDetalleActividadResponse>(`${this.url}/listarDetalleActividad`, params, {observe: 'response'});
  }

  public eliminarActividad(params: EliminarActividadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarActividad`, params, {observe: 'response'});
  }
}