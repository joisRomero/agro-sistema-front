import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlerReabrirCampaniaVars } from './aler-reabrir-campania-vars';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { CampaniaService } from 'src/app/services/campania.service';
import { lastValueFrom } from 'rxjs';
import { ReabrirCampaniaRequest } from 'src/app/models/requests/reabrirCampaniaRequest';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-alert-reabrir-campania',
  templateUrl: './alert-reabrir-campania.component.html',
  styleUrls: ['./alert-reabrir-campania.component.scss']
})
export class AlertReabrirCampaniaComponent implements OnInit {

  @Output() recargar = new EventEmitter();
  @Input() idCampania!: number;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: AlerReabrirCampaniaVars,
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
      this.alertInformationService.texto = "Campaña eliminada.";
    },
  };

  private service = {
    eliminarCapania: () => {
      let params: ReabrirCampaniaRequest = {
        idCampania: this.idCampania,
        usuarioModifica: this.nombreUsuario 
      }

      return lastValueFrom(this.campaniaService.reabrirCampania(params));
    }
  }

}
