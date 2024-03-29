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
import { IdSociedad } from '../models/id-sociedad';
import { Sociedad } from '../models/sociedad';
import { EliminarSociedadRequest } from '../models/requests/eliminarSociedadRequest';
import { EditarSociedadRequest } from '../models/requests/editarSociedadRequest';
import { AgregarSociedadRequest } from '../models/requests/agregarSociedadRequest';
import { ListaPaginadaSociedadResponse } from '../models/responses/listaPaginadaSociedadResponse';
import { ValidarPertenenciaSociedadResponse } from '../models/responses/validarPertenenciaSociedadResponse';
import { ValidarPertenenciaSociedadRequest } from '../models/requests/validarPertenenciaSociedadRequest';
import { BusquedaIntegranteRequest } from '../models/requests/busquedaIntegranteRequest';
import { BusquedaIntegranteResponse } from '../models/responses/busquedaIntegranteResponse';
import { AsignarAdministradorSociedadRequest } from '../models/requests/asignarAdministradorSociedadRequest';
import { RetirarseUsuarioSociedadRequest } from '../models/requests/retirarseUsuarioSociedadRequest';

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

  public obtenerIntegrantesSociedad(params: ObtenerIntegrantesSociedadRequest): Observable<HttpResponse<ObtenerIntegrantesSociedadResponse>> {
    return this.http.post<ObtenerIntegrantesSociedadResponse>(`${this.url}/obtenerIntegrantesSociedad`, params, {observe: 'response'});
  }

  public obtenerListaPaginaCampaniasSocidad(params: ListaPaginaCampaniasSocidadRequest): Observable<HttpResponse<ListaPaginaCampaniasSocidadResponse>> {
    return this.http.post<ListaPaginaCampaniasSocidadResponse>(`${this.url}/obtenerListaPaginaCampaniasSocidad`, params, {observe: 'response'});
  }

  public darDeBajaSociedad(params: IdSociedad): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarSociedad`, params, { observe: 'response' });
  }

  public obtenerPorId(params: IdSociedad): Observable<HttpResponse<Sociedad>> {
    return this.http.get<Sociedad>(`${this.url}/ObtenerPorId`, { observe: 'response', params: params as {} });
  }
  
  public obtenerListaSociedades(params: ListaPaginadaSociedadesRequest): Observable<HttpResponse<ListaPaginadaSociedadResponse>> {
    return this.http.get<ListaPaginadaSociedadResponse>(`${this.url}/listarSociedad?NombreSociedad=${params.nombre}&IdUsuario=${params.idUsuario}&PageSize=${params.pageSize}&PageNumber=${params.pageNumber}`, { observe: 'response' });
  }

  public agregarSociedad(params: AgregarSociedadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/agregarSociedad`, params, { observe: 'response' })
  }

  public editarSociedad(params: EditarSociedadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/editarSociedad`, params, { observe: 'response' })
  }

  public eliminarSociedad(params: EliminarSociedadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarSociedad`, params, { observe: 'response' })
  }

  public validarPertenenciaSociedad(params: ValidarPertenenciaSociedadRequest): Observable<HttpResponse<ValidarPertenenciaSociedadResponse>> {
    return this.http.post<ValidarPertenenciaSociedadResponse>(`${this.url}/validarPertenenciaSociedad`, params, { observe: 'response' })
  }

  public busquedaIntegrante(params: BusquedaIntegranteRequest): Observable<HttpResponse<BusquedaIntegranteResponse[]>> {
    return this.http.post<BusquedaIntegranteResponse[]>(`${this.url}/busquedaIntegrante`, params, { observe: 'response' })
  }

  public asignarAdministradorSociedad(params: AsignarAdministradorSociedadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/asignarAdministrador`, params, { observe: 'response' })
  }

  public retirarseUsuarioSociedad(params: RetirarseUsuarioSociedadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/retirarseUsuarioSociedad`, params, { observe: 'response' })
  }
  

}
