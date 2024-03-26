import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReporteInicioRequest } from '../models/requests/reporteInicioRequest';
import { ReporteInicioResponse } from '../models/responses/reporteInicioResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/api/v1/Reportes`
  }

  public reporteInicio(params: ReporteInicioRequest): Observable<HttpResponse<ReporteInicioResponse>> {
    return this.http.post<ReporteInicioResponse>(`${this.url}/reporteInicio`, params, {observe: 'response'});
  }
}