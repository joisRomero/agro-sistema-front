import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarInvitacionesSociedadesRequest } from '../models/requests/listarInvitacionesSociedadesRequest';
import { ListarInvitacionesSociedadesResponse } from '../models/responses/listarInvitacionesSociedadesResponse';
import { RegistrarInvitacionSociedadRequest } from '../models/requests/registrarInvitacionSociedadRequest';
import { CambiarEstadoInvitacionRequest } from '../models/requests/cambiarEstadoInvitacionRequest';

@Injectable({
  providedIn: 'root'
})
export class InvitacionService {
  private url: string = "";

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.apiUrl}/api/v1/Invitacion`;
  }

  public listarInvitacionesSociedades(params: ListarInvitacionesSociedadesRequest): Observable<HttpResponse<ListarInvitacionesSociedadesResponse[]>> {
    return this.http.get<ListarInvitacionesSociedadesResponse[]>(`${this.url}/listarInvitacionesSociedades`, {observe: 'response', params: params as {}});
  }

  public registrarInvitacionSociedad(params: RegistrarInvitacionSociedadRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/registrarInvitacionSociedad`, params, {observe: 'response'});
  }

  public cambiarEstadoInvitacion(params: CambiarEstadoInvitacionRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/cambiarEstadoInvitacion`, params, {observe: 'response'});
  }
}
