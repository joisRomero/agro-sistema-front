import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertEliminarTipoTrabajadorService } from './alert-eliminar-tipo-trabajador.service';
import { TipoTrabajadorService } from 'src/app/services/tipo-trabajador.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { EliminarTipoTrabajadorRequest } from 'src/app/models/requests/eliminarTipoTrabajadorRequest';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-alert-eliminar-tipo-trabajador',
  templateUrl: './alert-eliminar-tipo-trabajador.component.html',
  styleUrls: ['./alert-eliminar-tipo-trabajador.component.scss']
})
export class AlertEliminarTipoTrabajadorComponent implements OnInit {

  @Input() idTipoTrabajador!: number;
  @Output() elimino = new EventEmitter();

  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: AlertEliminarTipoTrabajadorService,
    public tipoTrabajadorService: TipoTrabajadorService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    eliminarTipoTrabajador: async () => {
      let response = await this.service.eliminarTipoTrabajador();
      this.servicioAlert.mostrar = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de trabajador";
      this.alertInformationService.texto = "Tipo de trabajador eliminado con éxito.";
    },
  };

  private service = {
    eliminarTipoTrabajador: () => {
      let params: EliminarTipoTrabajadorRequest = {
        idTipoTrabajador: this.idTipoTrabajador,
        usuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.tipoTrabajadorService.eliminarTipoTrabajador(params));
    },
  };

}
