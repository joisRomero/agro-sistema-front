import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/requests/loginRequest';
import { LoginResponse } from '../models/responses/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = "";

  constructor(
    private http: HttpClient
  ) {
    this.url = `${environment.apiUrl}/api/v1/login`;
  }

  public obtenerUsuario(params: LoginRequest): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(`${this.url}/obtenerUsuario`, params, {observe: 'response'});
  }

}
