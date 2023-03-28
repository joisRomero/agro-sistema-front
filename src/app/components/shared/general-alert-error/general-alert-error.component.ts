import { Component, OnInit } from '@angular/core';
import { GeneralAlertErrorVars } from './general-alert-error.vars';

@Component({
  selector: 'app-general-alert-error',
  templateUrl: './general-alert-error.component.html',
  styleUrls: ['./general-alert-error.component.scss']
})
export class GeneralAlertErrorComponent{

  constructor(public service: GeneralAlertErrorVars) { }

  onClick = {
    cerrar: () => {
      this.service.mostrar = false;
    }
  }
}
