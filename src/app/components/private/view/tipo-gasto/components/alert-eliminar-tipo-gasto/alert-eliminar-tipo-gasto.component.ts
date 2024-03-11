import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AlertEliminarService } from '../../../cultivo/components/alert-eliminar/alert-eliminar.service';
import { TipoGastoService } from 'src/app/services/tipo-gasto.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { EliminarTipoGastoRequest } from 'src/app/models/requests/eliminarTipoGastoRequest';
import { lastValueFrom } from 'rxjs';
import { AlertEliminarTipoGastoService } from './alert-eliminar-tipo-gasto.service';

@Component({
  selector: 'app-alert-eliminar-tipo-gasto',
  templateUrl: './alert-eliminar-tipo-gasto.component.html',
  styleUrls: ['./alert-eliminar-tipo-gasto.component.scss']
})
export class AlertEliminarTipoGastoComponent implements OnInit {
  @Input() idTipoGasto!: number;
  @Output() elimino = new EventEmitter();

  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: AlertEliminarTipoGastoService,
    public tipoGastoService: TipoGastoService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    eliminarTipoGasto: async () => {
      let response = await this.service.eliminarTipoGasto();
      this.servicioAlert.mostrar = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de gasto";
      this.alertInformationService.texto = "Tipo de gasto eliminado con éxito.";
    },
  };

  private service = {
    eliminarTipoGasto: () => {
      let params: EliminarTipoGastoRequest = {
        idTipoGasto: this.idTipoGasto,
        usuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.tipoGastoService.eliminarTipoGasto(params));
    },
  };

}
