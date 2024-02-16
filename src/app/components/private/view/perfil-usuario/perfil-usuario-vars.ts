import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})

export class PerfilUsuarioVars {
  public usuario: string = "";
  public nombreCompleto: string = "";

  constructor() { 
    let user: Usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (user) {
      this.usuario = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
      this.nombreCompleto = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreCompleto;
    }
  }

  public actualizarNombre(){
    this.usuario = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
    this.nombreCompleto = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreCompleto;
  }
}
