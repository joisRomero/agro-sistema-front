import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralAlertErrorVars {
  public texto: string = '';
  public mostrar: boolean = false;

  constructor() {}
}
