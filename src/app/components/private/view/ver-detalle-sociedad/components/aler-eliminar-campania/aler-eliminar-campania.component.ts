import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlerEliminarCampaniaVars } from './aler-eliminar-campania-vars';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { Usuario } from 'src/app/models/usuario';
import { CampaniaService } from 'src/app/services/campania.service';
import { EliminarCampaniaRequest } from 'src/app/models/requests/eliminarCampaniaRequest';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-aler-eliminar-campania',
  templateUrl: './aler-eliminar-campania.component.html',
  styleUrls: ['./aler-eliminar-campania.component.scss']
})
export class AlerEliminarCampaniaComponent implements OnInit {
  @Output() recargar = new EventEmitter();
  @Input() idCampania!: number;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: AlerEliminarCampaniaVars,
    public alertInformationService: GeneralAlertInformationVars,
    public campaniaService: CampaniaService
  ) { }

  ngOnInit(): void {
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    accion: async () => {
      let response = await this.service.eliminarCapania();
      this.servicioAlert.mostrar = false;
      this.recargar.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Campaña";
      this.alertInformationService.texto = "Campaña eliminada con éxito.";
    },
  };

  private service = {
    eliminarCapania: () => {
      let params: EliminarCampaniaRequest = {
        idCampania: this.idCampania,
        usuarioElimina: this.nombreUsuario 
      }

      return lastValueFrom(this.campaniaService.eliminarCampania(params));
    }
  }

}
