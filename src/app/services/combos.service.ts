import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObtenerUnidadesCosechaResponse } from '../models/responses/obtenerUnidadesCosechaResponse';
import { ObtenerCalidadesCosechaResponse } from '../models/responses/obtenerCalidadesCosechaResponse';

@Injectable({
  providedIn: 'root'
})
export class CombosService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/combos`
  }

  public obtenerUnidadesCosecha(): Observable<HttpResponse<ObtenerUnidadesCosechaResponse[]>> {
    return this.http.get<ObtenerUnidadesCosechaResponse[]>(`${this.url}/obtenerUnidadesCosecha`,  {observe: 'response'});
  }

  public obtenerCalidadesCosecha(): Observable<HttpResponse<ObtenerCalidadesCosechaResponse[]>> {
    return this.http.get<ObtenerCalidadesCosechaResponse[]>(`${this.url}/obtenerCalidadesCosecha`,  {observe: 'response'});
  }
}
