import { Cultivo } from './../models/cultivo';
import { IdCultivo } from './../models/id-cultivo';
import { ListaCultivosResponse } from './../models/responses/lista-cultivos-response';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaPaginadaCultivosResponse } from '../models/responses/listaPaginadaCultivosResponse';
import { ListaPaginadaCultivosRequest } from '../models/requests/listaPaginadaCultivosRequest';
import { AgregarCultivoRequest } from '../models/requests/agregarCultivoRequest';
import { EditarCultivoRequest } from '../models/requests/editarCultivoRequest';
import { EliminarCultivoRequest } from '../models/requests/eliminarCultivoRequest';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/Cultivo`
  }

  public obtenerListaCultivos(params: ListaPaginadaCultivosRequest): Observable<HttpResponse<ListaPaginadaCultivosResponse>> {
    return this.http.get<ListaPaginadaCultivosResponse>(`${this.url}/listarCultivo?NombreCultivo=${params.nombre}&IdUsuario=${params.IdUsuario}&PageSize=${params.PageSize}&PageNumber=${params.PageNumber}`, { observe: 'response' });
  }

  public agregarCultivo(params: AgregarCultivoRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/agregarCultivo`, params, { observe: 'response' })
  }

  public editarCultivo(params: EditarCultivoRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/editarCultivo`, params, { observe: 'response' })
  }

  public eliminarCultivo(params: EliminarCultivoRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarCultivo`, params, { observe: 'response' })
  }

  public cambiarEstado(params: IdCultivo): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/CambiarEstado`, params, { observe: 'response' });
  }

  public obtenerPorId(params: IdCultivo): Observable<HttpResponse<Cultivo>> {
    return this.http.get<Cultivo>(`${this.url}/ObtenerPorId`, { observe: 'response', params: params as {} });
  }

  public editar(params: Cultivo): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/Editar`, params, { observe: 'response' });
  }

}
