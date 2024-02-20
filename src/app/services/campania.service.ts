import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidarPertenenciaCampaniaSociedadRequest } from '../models/requests/validarPertenenciaCampaniaSociedadRequest';
import { ListaPaginaCampaniasUsuarioRequest } from '../models/requests/listaPaginaCampaniasUsuarioRequest';
import { ListaPaginaCampaniasUsuarioResponse } from '../models/responses/listaPaginaCampaniasUsuarioResponse';
import { RegistrarCampaniaRequest } from '../models/requests/registrarCampaniaRequest';
import { EditarCampaniaRequest } from '../models/requests/editarCampaniaRequest';
import { ObtenerCampaniaRequest } from '../models/requests/obtenerCampaniaRequest';
import { ObtenerCampaniaResponse } from '../models/responses/obtenerCampaniaResponse';
import { FinalizarCampaniaRequest } from '../models/requests/finalizarCampaniaRequest';
import { EliminarCampaniaRequest } from '../models/requests/eliminarCampaniaRequest';

@Injectable({
  providedIn: 'root'
})
export class CampaniaService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/campania`
  }

  public validar(params: ValidarPertenenciaCampaniaSociedadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/validar`, params, {observe: 'response'});
  }

  public obtenerListaPaginaCampaniasUsuario(params: ListaPaginaCampaniasUsuarioRequest): Observable<HttpResponse<ListaPaginaCampaniasUsuarioResponse>> {
    return this.http.post<ListaPaginaCampaniasUsuarioResponse>(`${this.url}/obtenerListaPaginaCampaniasUsuario`, params, {observe: 'response'});
  }

  public registrarCampania(params: RegistrarCampaniaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/registrarCampania`, params, {observe: 'response'});
  }

  public editarCampania(params: EditarCampaniaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/editarCampania`, params, {observe: 'response'});
  }

  public obtenerCampania(params: ObtenerCampaniaRequest): Observable<HttpResponse<ObtenerCampaniaResponse>> {
    return this.http.post<ObtenerCampaniaResponse>(`${this.url}/obtenerCampania`, params, {observe: 'response'});
  }

  public finalizarCampania(params: FinalizarCampaniaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/finalizarCampania`, params, {observe: 'response'});
  }

  public eliminarCampania(params: EliminarCampaniaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarCampania`, params, {observe: 'response'});
  }

}
