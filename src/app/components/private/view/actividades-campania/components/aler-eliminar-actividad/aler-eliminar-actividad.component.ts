import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EliminarActividadVars } from './eliminar-actividad-vars';
import { ActividadService } from 'src/app/services/actividad.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { Usuario } from 'src/app/models/usuario';
import { ListaPaginaActividadResponseItem } from 'src/app/models/responses/listaPaginaActividadResponse';
import { lastValueFrom } from 'rxjs';
import { EliminarActividadRequest } from 'src/app/models/requests/eliminarActividadRequest';

@Component({
  selector: 'app-aler-eliminar-actividad',
  templateUrl: './aler-eliminar-actividad.component.html',
  styleUrls: ['./aler-eliminar-actividad.component.scss']
})
export class AlerEliminarActividadComponent implements OnInit {
  @Input() item!: ListaPaginaActividadResponseItem;
  @Output() elimino = new EventEmitter();
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: EliminarActividadVars,
    public servicio: ActividadService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrarModal = false;
    },
    eliminar: async () => {
      let response = await this.service.eliminarActividad();
      this.servicioAlert.mostrarModal = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Actividad";
      this.alertInformationService.texto = "Actividad eliminada.";
    },
  };

  private service = {
    eliminarActividad: () => {
      let params: EliminarActividadRequest = {
        idActividad: this.item.idActividad,
        usuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.servicio.eliminarActividad(params));
    },
  };

}
