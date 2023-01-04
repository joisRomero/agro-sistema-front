import { Cultivo } from './../models/cultivo';
import { IdCultivo } from './../models/id-cultivo';
import { ListaCultivosResponse } from './../models/responses/lista-cultivos-response';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = `${environment.apiUrl}/Cultivo`
  }

  public obtenerListaCultivos(): Observable<HttpResponse<ListaCultivosResponse[]>> {
    return this.http.get<ListaCultivosResponse[]>(`${this.url}/ObtenerTodo`, { observe: 'response' });
  }

  public cambiarEstado(params: IdCultivo): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/CambiarEstado`, params, { observe: 'response' });
  }

  public obtenerPorId(params: IdCultivo): Observable<HttpResponse<Cultivo>> {
    return this.http.get<Cultivo>(`${this.url}/ObtenerPorId`, { observe: 'response', params: params as {} });
  } 

  public editar(params: Cultivo): Observable<HttpResponse<any>> { 
    return this.http.post<any>(`${this.url}/Editar`, params, { observe: 'response' });
  }

}
