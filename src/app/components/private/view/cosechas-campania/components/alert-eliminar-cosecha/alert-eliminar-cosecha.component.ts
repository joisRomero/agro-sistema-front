import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListaPaginadaCosechasResponseItem } from 'src/app/models/responses/listaPaginadaCosechasResponse';
import { Usuario } from 'src/app/models/usuario';
import { EliminarCosechaVars } from './eliminar-cosecha-vars';
import { CosechaService } from 'src/app/services/cosecha.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { lastValueFrom } from 'rxjs';
import { EliminarCosechaRequest } from 'src/app/models/requests/eliminarCosechaRequest';

@Component({
  selector: 'app-alert-eliminar-cosecha',
  templateUrl: './alert-eliminar-cosecha.component.html',
  styleUrls: ['./alert-eliminar-cosecha.component.scss']
})
export class AlertEliminarCosechaComponent implements OnInit {

  @Input() item!: ListaPaginadaCosechasResponseItem;
  @Output() elimino = new EventEmitter();
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: EliminarCosechaVars,
    public servicio: CosechaService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrarModal = false;
    },
    eliminar: async () => {
      let response = await this.service.eliminarCosecha();
      this.servicioAlert.mostrarModal = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Cosecha";
      this.alertInformationService.texto = "Cosecha eliminada.";
    },
  };

  private service = {
    eliminarCosecha: () => {
      let params: EliminarCosechaRequest = {
        idCosecha: this.item.idCosecha,
        usuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.servicio.eliminarCosecha(params));
    },
  };

}
