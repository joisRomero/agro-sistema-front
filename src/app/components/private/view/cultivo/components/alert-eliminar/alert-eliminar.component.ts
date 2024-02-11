import { IdCultivo } from './../../../../../../models/id-cultivo';
import { GeneralAlertInformationVars } from '../../../../../shared/general-alert-information/general-alert-information.vars';
import { EventEmitter } from '@angular/core';
import { CultivoService } from './../../../../../../services/cultivo.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AlertEliminarService } from './alert-eliminar.service';
import { lastValueFrom } from 'rxjs';
import { EliminarCultivoRequest } from 'src/app/models/requests/eliminarCultivoRequest';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-alert-eliminar',
  templateUrl: './alert-eliminar.component.html',
  styleUrls: ['./alert-eliminar.component.scss'],
})
export class AlertEliminarComponent implements OnInit {
  @Input() idCultivo!: number;
  @Output() elimino = new EventEmitter();

  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: AlertEliminarService,
    public cultivoService: CultivoService,
    public alertInformationService: GeneralAlertInformationVars
  ) {}

  ngOnInit(): void {}



  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    eliminarCultivo: async () => {
      let response = await this.service.eliminarCultivo();
      this.servicioAlert.mostrar = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Cultivo";
      this.alertInformationService.texto = response.body.mensaje;
    },
  };

  private service = {
    eliminarCultivo: () => {
      let params: EliminarCultivoRequest = {
        IdCultivo: this.idCultivo,
        UsuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.cultivoService.eliminarCultivo(params));
    },
  };
}
