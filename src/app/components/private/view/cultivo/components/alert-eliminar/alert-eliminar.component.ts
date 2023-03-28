import { IdCultivo } from './../../../../../../models/id-cultivo';
import { GeneralAlertInformationVars } from '../../../../../shared/general-alert-information/general-alert-information.vars';
import { EventEmitter } from '@angular/core';
import { CultivoService } from './../../../../../../services/cultivo.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AlertEliminarService } from './alert-eliminar.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-alert-eliminar',
  templateUrl: './alert-eliminar.component.html',
  styleUrls: ['./alert-eliminar.component.scss'],
})
export class AlertEliminarComponent implements OnInit {
  @Input() idCultivo!: number;
  @Output() elimino = new EventEmitter();

  constructor(
    public servicioAlert: AlertEliminarService,
    public cultivoService: CultivoService,
    public alertInformationService: GeneralAlertInformationVars
  ) {}

  ngOnInit(): void {}

  private service = {
    cambiarEstado: () => {
      let params: IdCultivo = {
        id: this.idCultivo,
      };
      return lastValueFrom(this.cultivoService.cambiarEstado(params));
    },
  };

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    cambiarEstado: async () => {
      let response = await this.service.cambiarEstado();
      this.servicioAlert.mostrar = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Cultivo";
      this.alertInformationService.texto = response.body.mensaje;
    },
  };
}
