import { GeneralAlertInformationService } from './general-alert-information.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-alert-information',
  templateUrl: './general-alert-information.component.html',
  styleUrls: ['./general-alert-information.component.scss']
})
export class GeneralAlertInformationComponent implements OnInit {

  constructor(
    public service: GeneralAlertInformationService
  ) { 
    console.log("hola soy la alerta")
  }

  ngOnInit(): void {
  }

  onClick = {
    cerrar: () => {
      this.service.mostrar = false;
    }
  }

}
