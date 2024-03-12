import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListaPaginaAgroquimicoResponseItem } from 'src/app/models/responses/listaPaginaAgroquimicoResponse';
import { AlertEliminarAgroquimicoVars } from './alert-eliminar-agroquimico-vars';
import { AgroquimicoService } from 'src/app/services/agroquimico.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { lastValueFrom } from 'rxjs';
import { EliminarAgroquimico } from 'src/app/models/requests/eliminarAgroquimico';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-alert-eliminar-agroquimico',
  templateUrl: './alert-eliminar-agroquimico.component.html',
  styleUrls: ['./alert-eliminar-agroquimico.component.scss']
})
export class AlertEliminarAgroquimicoComponent implements OnInit {

  @Input() item!: ListaPaginaAgroquimicoResponseItem;
  @Output() elimino = new EventEmitter();
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  
  constructor(
    public servicioAlert: AlertEliminarAgroquimicoVars,
    public servicio: AgroquimicoService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrarModal = false;
    },
    eliminar: async () => {
      let response = await this.service.eliminar();
      this.servicioAlert.mostrarModal = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Agroquímico";
      this.alertInformationService.texto = "Agroquímico eliminado.";
    },
  };

  private service = {
    eliminar: () => {
      let params: EliminarAgroquimico = {
        idAgroquimico: this.item.idAgroquimico,
        usuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.servicio.eliminarAgroquimico(params));
    },
  };

}
