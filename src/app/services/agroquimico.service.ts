import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaPaginaAbonoRequest } from '../models/requests/listaPaginaAbonoRequest';
import { ListaPaginaAgroquimicoResponse } from '../models/responses/listaPaginaAgroquimicoResponse';
import { AgregarAgroquimico } from '../models/requests/agregarAgroquimico';
import { EditarAgroquimicoRequest } from '../models/requests/editarAgroquimicoRequest';
import { EliminarAgroquimico } from '../models/requests/eliminarAgroquimico';
import { ObtenerAgroquimicoRequest } from '../models/requests/obtenerAgroquimicoRequest';
import { ObtenerAgroquimicoResponse } from '../models/responses/obtenerAgroquimicoResponse';
import { listaPaginaAgroquimicoRequest } from '../models/requests/listaPaginaAgroquimicoRequest';

@Injectable({
  providedIn: 'root'
})
export class AgroquimicoService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/Agroquimico`
  }

  public obtenerListaPaginadaAgroquimico(params: listaPaginaAgroquimicoRequest): Observable<HttpResponse<ListaPaginaAgroquimicoResponse>> {
    return this.http.post<ListaPaginaAgroquimicoResponse>(`${this.url}/obtenerListaPaginadaAgroquimico`, params, {observe: 'response'});
  }

  public agregarAgroquimico(params: AgregarAgroquimico): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/agregarAgroquimico`, params, {observe: 'response'});
  }

  public editarAgroquimico(params: EditarAgroquimicoRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/editarAgroquimico`, params, {observe: 'response'});
  }

  public obtenerAgroquimico(params: ObtenerAgroquimicoRequest): Observable<HttpResponse<ObtenerAgroquimicoResponse>> {
    return this.http.post<ObtenerAgroquimicoResponse>(`${this.url}/obtenerAgroquimico`, params, {observe: 'response'});
  }

  public eliminarAgroquimico(params: EliminarAgroquimico): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/eliminarAgroquimico`, params, {observe: 'response'});
  }
}