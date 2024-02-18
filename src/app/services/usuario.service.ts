import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidarNombreUsuarioRequest } from '../models/requests/validarNombreUsuarioRequest';
import { ValidarNombreUsuarioResponse } from '../models/responses/validarNombreUsuarioResponse';
import { CrearUsuarioRequest } from '../models/requests/crearUsuarioRequest';
import { CrearUsuarioResponse } from '../models/responses/crearUsuarioResponse';
import { ObtenerDatosUsuarioRequest } from '../models/requests/obtenerDatosUsuarioRequest';
import { ObtenerDatosUsuarioResponse } from '../models/responses/obtenerDatosUsuarioResponse';
import { EliminarCuentaUsuarioRequest } from '../models/requests/eliminarCuentaUsuarioRequest';
import { ActualizarDatosUsuarioRequest } from '../models/requests/actualizarDatosUsuarioRequest';
import { ActualizarDatosUsuarioResponse } from '../models/responses/actualizarDatosUsuarioResponse';
import { ActualizarClavesUsuarioRequest } from '../models/requests/actualizarClavesUsuarioRequest';
import { ActualizarClavesUsuarioResponse } from '../models/responses/actualizarClavesUsuarioResponse';
import { GenerarCodigoRecuperacionCuentaRequest } from '../models/requests/generarCodigoRecuperacionCuentaRequest';
import { CambiarClaveRecuperacionCuentaRequest } from '../models/requests/cambiarClaveRecuperacionCuentaRequest';
import { CambiarClaveRecuperacionCuentaResponse } from '../models/responses/cambiarClaveRecuperacionCuentaResponse';
import { ValidarCodigoRecuperacionCuentaRequest } from '../models/requests/validarCodigoRecuperacionCuentaRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = "";

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.apiUrl}/api/v1/usuario`;
  }

  public validarNombreUsuario(params: ValidarNombreUsuarioRequest): Observable<HttpResponse<ValidarNombreUsuarioResponse>> {
    return this.http.post<ValidarNombreUsuarioResponse>(`${this.url}/validarNombre`, params, {observe: 'response'});
  }

  public crearUsuario(params: CrearUsuarioRequest): Observable<HttpResponse<CrearUsuarioResponse>> {
    return this.http.post<CrearUsuarioResponse>(`${this.url}/crear`, params, {observe: 'response'});
  }

  public obtenerDatosUsuario(params: ObtenerDatosUsuarioRequest): Observable<HttpResponse<ObtenerDatosUsuarioResponse>> {
    return this.http.get<ObtenerDatosUsuarioResponse>(`${this.url}/obtenerDatos`, {observe: 'response', params: params as {}});
  }

  public actualizarUsuario(params: ActualizarDatosUsuarioRequest): Observable<HttpResponse<ActualizarDatosUsuarioResponse>> {
    return this.http.post<ActualizarDatosUsuarioResponse>(`${this.url}/actualizarDatos`, params, {observe: 'response'});
  }

  public actualizarClavesUsuario(params: ActualizarClavesUsuarioRequest): Observable<HttpResponse<ActualizarClavesUsuarioResponse>> {
    return this.http.post<ActualizarClavesUsuarioResponse>(`${this.url}/actualizarClaves`, params, {observe: 'response'});
  }

  public eliminarCuentaUsuario(params: EliminarCuentaUsuarioRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarCuenta`, params, {observe: 'response'});
  }

  public generarCodigoRecuperacionCuenta(params: GenerarCodigoRecuperacionCuentaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/generarCodigoRecuperacionCuenta`, params, {observe: 'response'});
  }

  public validarCodigoRecuperacionCuenta(params: ValidarCodigoRecuperacionCuentaRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/validarCodigoRecuperacionCuenta`, params, {observe: 'response'});
  }

  public cambiarClaveRecuperacionCuenta(params: CambiarClaveRecuperacionCuentaRequest): Observable<HttpResponse<CambiarClaveRecuperacionCuentaResponse>> {
    return this.http.post<CambiarClaveRecuperacionCuentaResponse>(`${this.url}/cambiarClaveRecuperacionCuenta`, params, {observe: 'response'});
  }

}
