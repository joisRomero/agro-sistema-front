import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObtenerUnidadesCosechaResponse } from '../models/responses/obtenerUnidadesCosechaResponse';
import { ObtenerCalidadesCosechaResponse } from '../models/responses/obtenerCalidadesCosechaResponse';
import { ObtenerUnidadesCampaniaResponse } from '../models/responses/obtenerUnidadesCampaniaResponse';
import { ObtenerCultivosUsuarioRequest } from '../models/requests/obtenerCultivosUsuarioRequest';
import { ObtenerCultivosUsuarioResponse } from '../models/responses/obtenerCultivosUsuarioResponse';
import { ObtenerTipoTrabajadorPorUsuarioRequest } from '../models/requests/obtenerTipoTrabajadorPorUsuarioRequest';
import { ObtenerTipoTrabajadorPorUsuarioResponse } from '../models/responses/obtenerTipoTrabajadorPorUsuarioResponse';
import { ObtenerTipoActividadPorUsuarioRequest } from '../models/requests/obtenerTipoActividadPorUsuarioRequest';
import { ObtenerTipoActividadPorUsuarioResponse } from '../models/responses/obtenerTipoActividadPorUsuarioResponse';
import { ObtenerTipoGastoPorUsuarioRequest } from '../models/requests/obtenerTipoGastoPorUsuarioRequest';
import { ObtenerTipoGastoPorUsuarioResponse } from '../models/responses/obtenerTipoGastoPorUsuarioResponse';
import { ObtenerTipoAgroquimicoResponse } from '../models/responses/obtenerTipoAgroquimicoResponse';
import { ObtenerUnidadAbonacionResponse } from '../models/responses/obtenerUnidadAbonacionResponse';
import { ObtenerUnidadFumigacionResponse } from '../models/responses/obtenerUnidadFumigacionResponse';
import { ObtenerUnidadFumigacionDetalleResponse } from '../models/responses/obtenerUnidadFumigacionDetalleResponse';
import { ObtenerUnidadSemillaResponse } from '../models/responses/obtenerUnidadSemillaResponse';
import { ObtenerAbonoUsuarioRequest } from '../models/requests/obtenerAbonoUsuarioRequest';
import { ObtenerAbonoUsuarioResponse } from '../models/responses/obtenerAbonoUsuarioResponse';
import { ObtenerAgroquimicoUsuarioResponse } from '../models/responses/obtenerAgroquimicoUsuarioResponse';
import { ObtenerAgroquimicoUsuarioRequest } from '../models/requests/obtenerAgroquimicoUsuarioRequest';

@Injectable({
  providedIn: 'root'
})
export class CombosService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/combos`
  }

  public obtenerUnidadesCosecha(): Observable<HttpResponse<ObtenerUnidadesCosechaResponse[]>> {
    return this.http.get<ObtenerUnidadesCosechaResponse[]>(`${this.url}/obtenerUnidadesCosecha`,  {observe: 'response'});
  }

  public obtenerCalidadesCosecha(): Observable<HttpResponse<ObtenerCalidadesCosechaResponse[]>> {
    return this.http.get<ObtenerCalidadesCosechaResponse[]>(`${this.url}/obtenerCalidadesCosecha`,  {observe: 'response'});
  }

  public obtenerCultivosUsuario(params: ObtenerCultivosUsuarioRequest): Observable<HttpResponse<ObtenerCultivosUsuarioResponse[]>> {
    return this.http.get<ObtenerCultivosUsuarioResponse[]>(`${this.url}/obtenerCultivos`,  {observe: 'response', params: params as {}});
  }

  public obtenerUnidadesCampania(): Observable<HttpResponse<ObtenerUnidadesCampaniaResponse[]>> {
    return this.http.get<ObtenerUnidadesCampaniaResponse[]>(`${this.url}/obtenerUnidadesCampania`,  {observe: 'response'});
  }

  public obtenerTipoTrabajadorPorUsuario(params: ObtenerTipoTrabajadorPorUsuarioRequest): Observable<HttpResponse<ObtenerTipoTrabajadorPorUsuarioResponse[]>> {
    return this.http.get<ObtenerTipoTrabajadorPorUsuarioResponse[]>(`${this.url}/obtenerTipoTrabajadorPorUsuario`,  {observe: 'response', params: params as {}});
  }

  public obtenerTipoActividadPorUsuario(params: ObtenerTipoActividadPorUsuarioRequest): Observable<HttpResponse<ObtenerTipoActividadPorUsuarioResponse[]>> {
    return this.http.get<ObtenerTipoActividadPorUsuarioResponse[]>(`${this.url}/obtenerTipoActividadPorUsuario`,  {observe: 'response', params: params as {}});
  }

  public obtenerTipoGastoPorUsuario(params: ObtenerTipoGastoPorUsuarioRequest): Observable<HttpResponse<ObtenerTipoGastoPorUsuarioResponse[]>> {
    return this.http.get<ObtenerTipoGastoPorUsuarioResponse[]>(`${this.url}/obtenerTipGastoPorUsuario`,  {observe: 'response', params: params as {}});
  }

  public obtenerTipoAgroquimico(): Observable<HttpResponse<ObtenerTipoAgroquimicoResponse[]>> {
    return this.http.get<ObtenerTipoAgroquimicoResponse[]>(`${this.url}/obtenerTipoAgroquimico`,  {observe: 'response'});
  }

  public obtenerUnidadAbonacion(): Observable<HttpResponse<ObtenerUnidadAbonacionResponse[]>> {
    return this.http.get<ObtenerUnidadAbonacionResponse[]>(`${this.url}/obtenerUnidadAbonacion`,  {observe: 'response'});
  }

  public obtenerUnidadFumigacion(): Observable<HttpResponse<ObtenerUnidadFumigacionResponse[]>> {
    return this.http.get<ObtenerUnidadFumigacionResponse[]>(`${this.url}/obtenerUnidadFumigacion`,  {observe: 'response'});
  }

  public obtenerUnidadFumigacionDetalle(): Observable<HttpResponse<ObtenerUnidadFumigacionDetalleResponse[]>> {
    return this.http.get<ObtenerUnidadFumigacionDetalleResponse[]>(`${this.url}/obtenerUnidadFumigacionDetalle`,  {observe: 'response'});
  }

  public obtenerUnidadSemilla(): Observable<HttpResponse<ObtenerUnidadSemillaResponse[]>> {
    return this.http.get<ObtenerUnidadSemillaResponse[]>(`${this.url}/obtenerUnidadSemilla`,  {observe: 'response'});
  }

  public obtenerAbonoUsuario(params: ObtenerAbonoUsuarioRequest): Observable<HttpResponse<ObtenerAbonoUsuarioResponse[]>> {
    return this.http.get<ObtenerAbonoUsuarioResponse[]>(`${this.url}/obtenerAbonoUsuario`,  {observe: 'response', params: params as {}});
  }

  public obtenerAgroquimicoUsuario(params: ObtenerAgroquimicoUsuarioRequest): Observable<HttpResponse<ObtenerAgroquimicoUsuarioResponse[]>> {
    return this.http.get<ObtenerAgroquimicoUsuarioResponse[]>(`${this.url}/obtenerAgroquimicoUsuario`,  {observe: 'response', params: params as {}});
  }
}
