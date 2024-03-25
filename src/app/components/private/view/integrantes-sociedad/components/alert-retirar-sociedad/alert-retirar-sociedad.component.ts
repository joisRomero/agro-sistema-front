import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertRetirarSociedadService } from './alert-retirar-sociedad.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { Usuario } from 'src/app/models/usuario';
import { SociedadService } from 'src/app/services/sociedad.service';
import { RetirarseUsuarioSociedadRequest } from 'src/app/models/requests/retirarseUsuarioSociedadRequest';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-alert-retirar-sociedad',
  templateUrl: './alert-retirar-sociedad.component.html',
  styleUrls: ['./alert-retirar-sociedad.component.scss']
})
export class AlertRetirarSociedadComponent implements OnInit {

  @Input() idSociedad: string = "";
  @Input() idIntegrante!: number;
  @Input() esRetirarse: boolean = false;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  @Output() recargar = new EventEmitter();
  public pregunta: string = "";

  
  constructor(
    public servicioAlert: AlertRetirarSociedadService,
    public alertInformationService: GeneralAlertInformationVars,
    public sociedadService: SociedadService
  ) { }

  ngOnInit(): void {
    if(this.esRetirarse) {
      this.pregunta = "¿Está seguro de retirarse de la sociedad?";
    } else {
      this.pregunta = "¿Está seguro de retirarlo de la sociedad?";
    }
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    accion: async () => {
      let response = await this.service.asignarAdministradorSociedadRequest();
      this.servicioAlert.mostrar = false;
      this.recargar.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Integrantes";
      this.alertInformationService.texto = "Se retiró al integrante.";
    },
  };

  private service = {
    asignarAdministradorSociedadRequest: () => {
      let params: RetirarseUsuarioSociedadRequest = {
        idSociedad: parseInt(this.idSociedad),
        idUsuario: this.idIntegrante,
        usuarioModifica: this.nombreUsuario
      };
      return lastValueFrom(this.sociedadService.retirarseUsuarioSociedad(params));
    },
  };

}
