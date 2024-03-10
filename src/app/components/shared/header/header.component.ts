import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router, Routes } from '@angular/router';
import { privateModuleRoutes } from '../../private/private-routing.module';
import { SidebarVars } from '../sidebar/sidebar.component.vars';
import { Usuario } from 'src/app/models/usuario';
import { PerfilUsuarioVars } from '../../private/view/perfil-usuario/perfil-usuario-vars';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { lastValueFrom } from 'rxjs';
import { ListarInvitacionesSociedadesRequest } from 'src/app/models/requests/listarInvitacionesSociedadesRequest';
import { ListarInvitacionesSociedadesResponse } from 'src/app/models/responses/listarInvitacionesSociedadesResponse';
import { CambiarEstadoInvitacionRequest } from 'src/app/models/requests/cambiarEstadoInvitacionRequest';
import { GeneralAlertInformationVars } from '../general-alert-information/general-alert-information.vars';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public usuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public nombreCompleto: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreCompleto;
  public listaInvitaciones: ListarInvitacionesSociedadesResponse[] = [];
  private connection: HubConnection;
  
  constructor(
    public sidebarVars: SidebarVars,
    public route: Router,
    public perfilUsuarioVars: PerfilUsuarioVars,
    public invitacionService: InvitacionService,
    private alertInformationService: GeneralAlertInformationVars,
    private toastService: ToastrService
  ) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hubs/invitaciones`)
      .build();

    this.connection.on("EnviarNotificacionInvitacion", listaInvitaciones => this.ObtenerInvitacionesHub(listaInvitaciones));

  }
  
  ngOnInit(): void {
    this.listaInvitaciones = [];
    this.obtenerInvitaciones();
    this.connection.start()
      .then(_ => {
        this.connection.invoke('AgregarAGrupo', `${this.usuario}Invitacion`);
      }).catch(error => {
        return console.error(error);
      });
  }

  onClickNavButton() {
    this.sidebarVars.mostrarSidebar = !this.sidebarVars.mostrarSidebar;
  }

  private async obtenerInvitaciones() {
    let respose = await this.service.listarInvitacionesSociedades();
    if(respose.status == 200){
      this.listaInvitaciones = respose.body!;
    }
  }

  ObtenerInvitacionesHub(listaInvitaciones: ListarInvitacionesSociedadesResponse[]) {
    this.listaInvitaciones = [];
    this.listaInvitaciones = listaInvitaciones;
    listaInvitaciones.forEach(element => {
      this.toastService.info(`Tienes una nueva invitacion de ${element.nombreEmisor}`, "Invitación", {
        closeButton: true,
        positionClass: 'toast-bottom-right'
      })
    });
  }

  editarPerfil() {
    this.route.navigate(["intranet/perfil"]);
  }

  cerrarSesion() {
    this.route.navigate(['']);
    localStorage.clear();
  }

  onClick = {
    rechazar: async (item: ListarInvitacionesSociedadesResponse) => {
      let params: CambiarEstadoInvitacionRequest = {
        accion: "R",
        idInvitacion: item.idInvitacion,
        usuarioModifica: this.usuario
      }
      let response = await this.service.cambiarEstadoInvitacion(params);
      this.obtenerInvitaciones();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Invitaciones a una sociedad";
      this.alertInformationService.texto = "Invitación rechazada con éxto.";
    },
    aceptar: async (item: ListarInvitacionesSociedadesResponse) => {
      let params: CambiarEstadoInvitacionRequest = {
        accion: "A",
        idInvitacion: item.idInvitacion,
        usuarioModifica: this.usuario
      }
      let response = await this.service.cambiarEstadoInvitacion(params);
      this.obtenerInvitaciones();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Invitaciones a una sociedad";
      this.alertInformationService.texto = "Invitación aceptada con éxto.";
    },
  }

  private service = {
    listarInvitacionesSociedades: () => {
      let params: ListarInvitacionesSociedadesRequest = {
        idUsuario: parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario)
      }
      return lastValueFrom(this.invitacionService.listarInvitacionesSociedades(params));
    },
    cambiarEstadoInvitacion: (params: CambiarEstadoInvitacionRequest) => {
      return lastValueFrom(this.invitacionService.cambiarEstadoInvitacion(params));
    }
  }
}
