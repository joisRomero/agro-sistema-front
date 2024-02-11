import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})

export class PerfilUsuarioVars {
  public usuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public nombreCompleto: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreCompleto;

  constructor() { }

  public actualizarNombre(){
     this.usuario = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
     this.nombreCompleto = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreCompleto;
  }

}
