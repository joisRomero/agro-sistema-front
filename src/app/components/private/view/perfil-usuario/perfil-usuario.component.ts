import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { ActualizarClavesUsuarioRequest } from 'src/app/models/requests/actualizarClavesUsuarioRequest';
import { ActualizarDatosUsuarioRequest } from 'src/app/models/requests/actualizarDatosUsuarioRequest';
import { ObtenerDatosUsuarioRequest } from 'src/app/models/requests/obtenerDatosUsuarioRequest';
import { ObtenerDatosUsuarioResponse } from 'src/app/models/responses/obtenerDatosUsuarioResponse';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SpaceValidator } from 'src/app/validators/white-space.validator';
import { AlertEliminarUsuarioService } from './components/alert-eliminar-usuario/alert-eliminar-usuario.service';
import { PerfilUsuarioVars } from './perfil-usuario-vars';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {


  public formPerfil!: FormGroup;
  public formClaves!: FormGroup;
  public usuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  public idUsuario: number = Number.parseInt(this.usuario);
  public nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public nombreCompleto: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreCompleto;

  public mensajesError = {
    claveAnterior: "El campo es obligatorio.",
    clave: "El campo es obligatorio.",
    repetirClave: "El campo es obligatorio.",
    nombre: "El campo es obligatorio.",
    apellidoPaterno: "El campo es obligatorio.",
    apellidoMaterno: "El campo es obligatorio.",
    correo: "El campo es obligatorio. Ingrese un correo electrónico válido.",
  }
  public respuestaRespuestaClave: boolean = true;

  constructor(
    private fb: FormBuilder,
    private fb_c: FormBuilder,
    private usuarioService: UsuarioService,
    public alertInformationService: GeneralAlertInformationVars,
    public alertEliminarService: AlertEliminarUsuarioService,
    public perfilUsuarioVars: PerfilUsuarioVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.cargarDatos();
  }

  public async cargarDatos() {
    let response = await this.services.obtenerInformacionUsuario();
    if(response.status != 200) {
      return;
    }
    this.nombreCompleto = `${response.body!.nombre} ${response.body!.apellidoPaterno} ${response.body!.apellidoMaterno}`;
    this.formPerfil.get('nombre')?.setValue(response.body!.nombre);
    this.formPerfil.get('apellidoPaterno')?.setValue(response.body!.apellidoPaterno);
    this.formPerfil.get('apellidoMaterno')?.setValue(response.body!.apellidoMaterno);
    this.formPerfil.get('correo')?.setValue(response.body!.correo);
  }

  private iniciarControles() {
    this.formPerfil = this.fb.nonNullable.group({
      nombre: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      apellidoPaterno: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      apellidoMaterno: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      correo: ['', [Validators.required, SpaceValidator.noWhitespaceValidator, Validators.email]]
    });

    this.formClaves = this.fb_c.nonNullable.group({
      clave: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      repetirClave: ['', [Validators.required, SpaceValidator.noWhitespaceValidator, this.validarRepetirClaveValidator()]],
      claveAnterior: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
    })
  }

  public validarRepetirClaveValidator(): ValidatorFn | null {
    return () => {
      return this.respuestaRespuestaClave ? null : { isValid: false };
    };
  }

  public validarRepetirClave() {
    this.respuestaRespuestaClave = this.formClaves.controls["clave"]!.value == this.formClaves.controls["repetirClave"]!.value;
    console.log(this.respuestaRespuestaClave)
    if(this.formClaves.controls["clave"]!.value == "" || this.formClaves.controls["clave"]!.value == ""){
      this.mensajesError.repetirClave = "El campo es obligatorio."
    }
    if(!this.respuestaRespuestaClave) {
      this.mensajesError.repetirClave = "Las contraseñas tienen que ser iguales."
    }
    
    this.formClaves.controls["repetirClave"]!.updateValueAndValidity();
  }

  public async actualizarInformacionPerfil() {
    this.formPerfil.markAllAsTouched();
    if(!this.formPerfil.valid) {
      return;
    }
    let response = await this.services.actualizarInformacionUsuario();
    if(response.status != 200){
      return
    }

    let usuario = JSON.parse(localStorage.getItem("usuario")!) as Usuario;
    usuario.nombreCompleto = `${this.formPerfil.controls["nombre"]!.value} ${this.formPerfil.controls["apellidoPaterno"]!.value} ${this.formPerfil.controls["apellidoMaterno"]!.value}`;
    localStorage.removeItem("usuario");
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.perfilUsuarioVars.actualizarNombre();
    this.cargarDatos();
  }

  public async actualizarClaves() {
    this.formClaves.markAllAsTouched();
    if(!this.formPerfil.valid) {
      return;
    }
    let response = await this.services.actualizarClave();
    if(response.status != 200){
      return
    }
    window.location.reload();
  }

  private services = {
    obtenerInformacionUsuario: () => {
      let param: ObtenerDatosUsuarioRequest = {
        IdUsuario: Number.parseInt(this.usuario)
      }
      return lastValueFrom(this.usuarioService.obtenerDatosUsuario(param));
    },
    actualizarInformacionUsuario: () => {
      let param: ActualizarDatosUsuarioRequest = {
        id: Number.parseInt(this.usuario),
        apellidoMaterno: this.formPerfil.controls["apellidoMaterno"]!.value,
        apellidoPaterno: this.formPerfil.controls["apellidoPaterno"]!.value,
        correo: this.formPerfil.controls["correo"]!.value,
        nombre: this.formPerfil.controls["nombre"]!.value,
      }
      return lastValueFrom(this.usuarioService.actualizarUsuario(param));
    },
    actualizarClave: () => {
      let param: ActualizarClavesUsuarioRequest = {
        claveActual: this.formClaves.controls["claveAnterior"]!.value,
        claveNueva: this.formClaves.controls["clave"]!.value,
        idUsuario: Number.parseInt(this.usuario)
      }
      return lastValueFrom(this.usuarioService.actualizarClavesUsuario(param));
    },
    
  }


  eliminar() {
    this.alertEliminarService.mostrar = true;
  }

}
