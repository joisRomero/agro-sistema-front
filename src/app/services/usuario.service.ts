import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidarNombreUsuarioRequest } from '../models/requests/validarNombreUsuarioRequest';
import { ValidarNombreUsuarioResponse } from '../models/responses/validarNombreUsuarioResponse';
import { CrearUsuarioRequest } from '../models/requests/crearUsuarioRequest';
import { CrearUsuarioResponse } from '../models/responses/crearUsuarioResponse';

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
    return this.http.post<ValidarNombreUsuarioResponse>(`${this.url}/validarNombreUsuario`, params, {observe: 'response'});
  }

  public crearUsuario(params: CrearUsuarioRequest): Observable<HttpResponse<CrearUsuarioResponse>> {
    return this.http.post<CrearUsuarioResponse>(`${this.url}/crear`, params, {observe: 'response'});
  }

}
