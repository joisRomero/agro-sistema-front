import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AlertEliminarTipoActividadService } from './alert-eliminar-tipo-actividad.service';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { EliminarTipoActividadRequest } from 'src/app/models/requests/eliminarTipoActividadRequest';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-alert-eliminar-tipo-actividad',
  templateUrl: './alert-eliminar-tipo-actividad.component.html',
  styleUrls: ['./alert-eliminar-tipo-actividad.component.scss']
})
export class AlertEliminarTipoActividadComponent implements OnInit {

  @Input() idTipoActividad!: number;
  @Output() elimino = new EventEmitter();

  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: AlertEliminarTipoActividadService,
    public tipoActividadService: TipoActividadService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    eliminarTipoActividad: async () => {
      let response = await this.service.eliminarTipoActividad();
      this.servicioAlert.mostrar = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de actividad";
      this.alertInformationService.texto = "Tipo de actividad eliminado.";
    },
  };

  private service = {
    eliminarTipoActividad: () => {
      let params: EliminarTipoActividadRequest = {
        idTipoActividad: this.idTipoActividad,
        usuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.tipoActividadService.eliminarTipoActividad(params));
    },
  };

}
