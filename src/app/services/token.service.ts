import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenRequest } from '../models/requests/tokenRequest';
import { TokenResponse } from '../models/responses/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private url: string = "";

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.apiUrl}/api/v1/Token`;
  }

  public crearToken(params: TokenRequest): Observable<HttpResponse<TokenResponse>> {
    const headers = {
      'content-type': 'application/json; charset=utf-8',
      // 'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': 'origen',
      'Client-Id': `${environment.clienteId}`
    };
    return this.http.post<TokenResponse>(`${this.url}/tokenUsuario`,
      params,
      {
        observe: 'response',
        headers: headers
      }
    );
  }
}
