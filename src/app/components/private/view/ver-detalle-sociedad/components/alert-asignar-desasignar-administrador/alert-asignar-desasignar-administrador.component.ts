import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AlertAsignarDesasignarAdministradorService } from './alert-asignar-desasignar-administrador.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { Usuario } from 'src/app/models/usuario';
import { SociedadService } from 'src/app/services/sociedad.service';
import { AsignarAdministradorSociedadRequest } from 'src/app/models/requests/asignarAdministradorSociedadRequest';

@Component({
  selector: 'app-alert-asignar-desasignar-administrador',
  templateUrl: './alert-asignar-desasignar-administrador.component.html',
  styleUrls: ['./alert-asignar-desasignar-administrador.component.scss']
})
export class AlertAsignarDesasignarAdministradorComponent implements OnInit {
  @Input() idSociedad: string = "";
  @Input() idIntegrante!: number;
  @Input() esAsignarAdministrador: boolean = false;
  @Input() esDesasignarAdministrador: boolean = false;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  @Output() recargar = new EventEmitter();
  public pregunta: string = "";

  constructor(
    public servicioAlert: AlertAsignarDesasignarAdministradorService,
    public alertInformationService: GeneralAlertInformationVars,
    public sociedadService: SociedadService
  ) { }

  ngOnInit(): void {
    if(this.esAsignarAdministrador) {
      this.pregunta = "¿Está seguro de asignarlo como administrador?";
    } else {
      this.pregunta = "¿Está seguro de descartarlo como administrador?";
    }
  }

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    accion: async () => {
      let accion: string = "";
      if(this.esAsignarAdministrador) {
        accion = "A";
      } else {
        accion = "D";
      }
      let response = await this.service.asignarAdministradorSociedadRequest(accion);
      this.servicioAlert.mostrar = false;
      this.recargar.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Integrantes";
      this.alertInformationService.texto = "Realizó el cambio con éxito.";
    },
  };

  private service = {
    asignarAdministradorSociedadRequest: (accion: string) => {
      let params: AsignarAdministradorSociedadRequest = {
        idSociedad: parseInt(this.idSociedad),
        idUsuario: this.idIntegrante,
        accion: accion,
        usuarioModifica: this.nombreUsuario
      };
      return lastValueFrom(this.sociedadService.asignarAdministradorSociedad(params));
    },
  };

}
