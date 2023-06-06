import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginadaCosechasRequest } from '../models/requests/listaPaginadaCosechasRequest';
import { ListaPaginadaCosechasResponse } from '../models/responses/listaPaginadaCosechasResponse';

@Injectable({
  providedIn: 'root'
})
export class CosechaService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/cosecha`
  }

  public obtenerListaCosechas(params: ListaPaginadaCosechasRequest): Observable<HttpResponse<ListaPaginadaCosechasResponse>> {
    return this.http.post<ListaPaginadaCosechasResponse>(`${this.url}/obtenerListaPaginadaCosechas`, params, {observe: 'response'});
  }
}
