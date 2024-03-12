import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DarDeBajaSociedadVars } from './dar-de-baja-sociedad.vars';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { SociedadService } from 'src/app/services/sociedad.service';
import { IdSociedad } from 'src/app/models/id-sociedad';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { EliminarSociedadRequest } from 'src/app/models/requests/eliminarSociedadRequest';

@Component({
  selector: 'app-dar-de-baja-sociedad',
  templateUrl: './dar-de-baja-sociedad.component.html',
  styleUrls: ['./dar-de-baja-sociedad.component.scss']
})
export class DarDeBajaSociedadComponent implements OnInit {
  @Input() idSociedad!: number;
  @Output() elimino = new EventEmitter();

  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioAlert: DarDeBajaSociedadVars,
    public sociedadService: SociedadService,
    public alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
  }

  private service = {
    eliminar: () => {
      let params: EliminarSociedadRequest = {
        IdSociedad: this.idSociedad,
        UsuarioElimina: this.nombreUsuario
      };
      return lastValueFrom(this.sociedadService.eliminarSociedad(params));
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
      this.alertInformationService.titulo = "Sociedad";
      this.alertInformationService.texto = "Sociedad eliminada.";
    },
  };

}
