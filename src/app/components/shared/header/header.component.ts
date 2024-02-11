import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router, Routes } from '@angular/router';
import { privateModuleRoutes } from '../../private/private-routing.module';
import { SidebarVars } from '../sidebar/sidebar.component.vars';
import { Usuario } from 'src/app/models/usuario';
import { PerfilUsuarioVars } from '../../private/view/perfil-usuario/perfil-usuario-vars';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public usuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public nombreCompleto: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreCompleto;

  constructor(
    public sidebarVars: SidebarVars,
    public route: Router,
    public perfilUsuarioVars: PerfilUsuarioVars
  ) {}

  ngOnInit(): void {
  }

  onClickNavButton() {
    this.sidebarVars.mostrarSidebar = !this.sidebarVars.mostrarSidebar;
  }

  editarPerfil() {
    this.route.navigate(["intranet/perfil"]);
  }

  cerrarSesion() {
    this.route.navigate(['']);
    localStorage.clear();
  }
}
