import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListaPaginaAbonoResponseItem } from 'src/app/models/responses/listaPaginaAbonoResponse';
import { Usuario } from 'src/app/models/usuario';
import { AlertEliminarAbonoVars } from './alert-eliminar-abono-vars';
import { AbonoService } from 'src/app/services/abono.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { EliminarAbono } from 'src/app/models/requests/eliminarAbono';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-alert-eliminar-abono',
  templateUrl: './alert-eliminar-abono.component.html',
  styleUrls: ['./alert-eliminar-abono.component.scss']
})
export class AlertEliminarAbonoComponent implements OnInit {
  @Input() item!: ListaPaginaAbonoResponseItem;
  @Output() elimino = new EventEmitter();
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  
  constructor(
    public servicioAlert: AlertEliminarAbonoVars,
    public servicio: AbonoService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrarModal = false;
    },
    eliminar: async () => {
      let response = await this.service.eliminarAbono();
      this.servicioAlert.mostrarModal = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Abono";
      this.alertInformationService.texto = "Abono eliminado con éxito.";
    },
  };

  private service = {
    eliminarAbono: () => {
      let params: EliminarAbono = {
        idAbono: this.item.idAbono,
        usuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.servicio.eliminarAbono(params));
    },
  };

}
