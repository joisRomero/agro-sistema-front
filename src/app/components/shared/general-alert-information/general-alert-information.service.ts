import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralAlertInformationService {

  public titulo: string = '';
  public texto: string = '';
  public mostrar: boolean = false;
  
  constructor() {}
}
