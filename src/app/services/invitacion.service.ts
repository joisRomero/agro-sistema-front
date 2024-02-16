import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarInvitacionesSociedadesRequest } from '../models/requests/listarInvitacionesSociedadesRequest';
import { ListarInvitacionesSociedadesResponse } from '../models/responses/listarInvitacionesSociedadesResponse';

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

  public obtenerUsuario(params: ListarInvitacionesSociedadesRequest): Observable<HttpResponse<ListarInvitacionesSociedadesResponse[]>> {
    return this.http.post<ListarInvitacionesSociedadesResponse[]>(`${this.url}/listarInvitacionesSociedades`, params, {observe: 'response'});
  }

}
