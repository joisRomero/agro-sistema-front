import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { EliminarCuentaUsuarioRequest } from 'src/app/models/requests/eliminarCuentaUsuarioRequest';
import { lastValueFrom } from 'rxjs';
import { AlertEliminarUsuarioService } from './alert-eliminar-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-eliminar-usuario',
  templateUrl: './alert-eliminar-usuario.component.html',
  styleUrls: ['./alert-eliminar-usuario.component.scss']
})
export class AlertEliminarUsuarioComponent implements OnInit {
  @Input() id!: number;
  constructor(
    public servicioAlert: AlertEliminarUsuarioService,
    public usuarioService: UsuarioService,
    public alertInformationService: GeneralAlertInformationVars,
    public route: Router
  ) { }

  ngOnInit(): void {
  }

  private service = {
    cambiarEstado: () => {
      let params: EliminarCuentaUsuarioRequest = {
        idUsuario: this.id
      };
      return lastValueFrom(this.usuarioService.eliminarCuentaUsuario(params));
    },
  };

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrar = false;
    },
    cambiarEstado: async () => {
      let response = await this.service.cambiarEstado();
      if(response.status != 200) {
        return;
      }
      this.route.navigate(['']);
      sessionStorage.clear();

    },
  };


  

}
