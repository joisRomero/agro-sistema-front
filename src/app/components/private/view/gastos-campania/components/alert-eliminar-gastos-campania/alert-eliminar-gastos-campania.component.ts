import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { EliminarGastosCampaniaVars } from './eliminar-gastos-campania.vars';
import { GastoDetalleService } from 'src/app/services/gasto-detalle.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { EliminarGastoDetalleRequest } from 'src/app/models/requests/eliminarGastoDetalleRequest';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-alert-eliminar-gastos-campania',
  templateUrl: './alert-eliminar-gastos-campania.component.html',
  styleUrls: ['./alert-eliminar-gastos-campania.component.scss']
})
export class AlertEliminarGastosCampaniaComponent implements OnInit {

  @Input() id!: number;
  @Output() elimino = new EventEmitter();
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: EliminarGastosCampaniaVars,
    public gastoDetalleService: GastoDetalleService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  private service = {
    eliminar: () => {
      let params: EliminarGastoDetalleRequest = {
        idGastoDetalle: this.id,
        usuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.gastoDetalleService.eliminarGastoDetalle(params));
    },
  };

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrarModal = false;
    },
    eliminar: async () => {
      let response = await this.service.eliminar();
      this.servicioAlert.mostrarModal = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Gastos";
      this.alertInformationService.texto = "Gasto eliminado exitosamente";
    },
  };

}
