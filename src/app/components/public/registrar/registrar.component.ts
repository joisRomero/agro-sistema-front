import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TokenRequest } from 'src/app/models/requests/tokenRequest';
import { TokenService } from 'src/app/services/token.service';
import { SpaceValidator } from 'src/app/validators/white-space.validator';
import * as CryptoJS from 'crypto-js';
import { LoginRequest } from 'src/app/models/requests/loginRequest';
import { LoginService } from 'src/app/services/login.service';
import { LoginResponse } from 'src/app/models/responses/loginResponse';
import { Usuario } from 'src/app/models/usuario';
import { ValidarNombreUsuarioRequest } from 'src/app/models/requests/validarNombreUsuarioRequest';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CrearUsuarioRequest } from 'src/app/models/requests/crearUsuarioRequest';
import { PerfilUsuarioVars } from '../../private/view/perfil-usuario/perfil-usuario-vars';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  public form!: FormGroup;
  public mensajesError = {
    usuario: "El campo es obligatorio.",
    clave: "El campo es obligatorio.",
    repetirClave: "El campo es obligatorio.",
    nombre: "El campo es obligatorio.",
    apellidoPaterno: "El campo es obligatorio.",
    apellidoMaterno: "El campo es obligatorio.",
    correo: "El campo es obligatorio.",
  }
  public loginResponse!: LoginResponse;
  public respuestaValidarUsuario: boolean = false;
  public respuestaRespuestaClave: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    public perfilUsuarioVars: PerfilUsuarioVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.onChange.correoElectronico();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      usuario: ['', [Validators.required, SpaceValidator.noWhitespaceValidator, this.validarNombreUsuarioValidator(), Validators.maxLength(50)]],
      clave: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      repetirClave: ['', [Validators.required, SpaceValidator.noWhitespaceValidator, this.validarRepetirClaveValidator()]],
      nombre: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      apellidoPaterno: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      apellidoMaterno: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      correo: ['', [Validators.required, SpaceValidator.noWhitespaceValidator, Validators.email]]
    });
  }

  public validarRepetirClaveValidator(): ValidatorFn | null {
    return () => {
      return this.respuestaRespuestaClave ? null : { isValid: false };
    };
  }

  public validarRepetirClave() {
    this.respuestaRespuestaClave = this.form.controls["clave"]!.value == this.form.controls["repetirClave"]!.value;
    console.log(this.respuestaRespuestaClave)
    if(this.form.controls["clave"]!.value == "" || this.form.controls["clave"]!.value == ""){
      this.mensajesError.repetirClave = "El campo es obligatorio."
    }
    if(!this.respuestaRespuestaClave) {
      this.mensajesError.repetirClave = "Las contraseñas tienen que ser iguales."
    }
    
    this.form.controls["repetirClave"]!.updateValueAndValidity();
  }

  public validarNombreUsuarioValidator() : ValidatorFn {
    return () => {
      return this.respuestaValidarUsuario ? { isValid: false } : null;
    };
  }

  public async validarNombreUsuario(){
    let nombreUsuario = this.form.controls["usuario"]!.value;
    if(nombreUsuario.length > 0) {
      let responseValidarNombreUsuario = await this.services.validarNombreUsuario();
      if(responseValidarNombreUsuario.status != 200){
        return 
      }
      this.respuestaValidarUsuario = responseValidarNombreUsuario.body!.respuesta;
      if(responseValidarNombreUsuario.body!.respuesta){
        this.mensajesError.usuario = "El nombre de usuario ya existe."
      }
    } else {
      this.respuestaValidarUsuario = false;
      this.mensajesError.usuario = "El campo es obligatorio."
    }

    this.form.controls["usuario"]!.updateValueAndValidity();
  }

  public onChange = {
    correoElectronico: () => {
      this.form.controls["correo"].valueChanges.subscribe(
        () => {
          if(this.form.controls["correo"].errors?.['email']){
            this.mensajesError.correo = "Ingrese un correo electrónico válido."
          } else {
            this.mensajesError.correo = "El campo es obligatorio."
          }
        }
      );
    }
  }

  public async registrar(){
    localStorage.clear();
    localStorage.clear();

    this.form.markAllAsTouched();
    if(this.form.valid){

      let responseCrearUsuario = await this.services.crearUsuario();

      if(responseCrearUsuario.status != 200){
        return
      }

      if(responseCrearUsuario.body!.idUsuario < 1){
        return
      }

      let responseToken = await this.services.crearToken();
      if (responseToken.status != 200){
        return 
      }
      localStorage.setItem('token', responseToken.body!.access_token);
      let responseLogin = await this.services.login();

      if (responseLogin.status != 200) {
        return
      }

      this.loginResponse = responseLogin.body!;
      let usuario: Usuario = {
        nombreUsuario: this.loginResponse.nombreUsuario,
        idUsuario: this.loginResponse.idUsuario,
        nombreCompleto: this.loginResponse.nombreCompleto
      }
      localStorage.setItem("usuario", JSON.stringify(usuario));
      this.perfilUsuarioVars.actualizarNombre();
      this.router.navigate(["intranet"]);
    }
  }

  private services = {
    crearToken: () => {
      const encodedWordUsuario = CryptoJS.enc.Utf8.parse(this.form!.controls['usuario']!.value.trim());
      const encodedUsuario = CryptoJS.enc.Base64.stringify(encodedWordUsuario);
      const encodedWordClave = CryptoJS.enc.Utf8.parse(this.form!.controls['clave']!.value.trim());
      const encodedClave = CryptoJS.enc.Base64.stringify(encodedWordClave);
      let params: TokenRequest = {
        usuario: encodedUsuario,
        clave: encodedClave,
      }
      return lastValueFrom(this.tokenService.crearToken(params));
    },
    login: () => {
      const encodedWordUsuario = CryptoJS.enc.Utf8.parse(this.form!.controls['usuario']!.value.trim());
      const encodedUsuario = CryptoJS.enc.Base64.stringify(encodedWordUsuario);
      const encodedWordClave = CryptoJS.enc.Utf8.parse(this.form!.controls['clave']!.value.trim());
      const encodedClave = CryptoJS.enc.Base64.stringify(encodedWordClave);
      let params: LoginRequest = {
        usuario: encodedUsuario,
        clave: encodedClave,
      }
      return lastValueFrom(this.loginService.obtenerUsuario(params));
    },
    validarNombreUsuario: () => {
      let params: ValidarNombreUsuarioRequest = {
        nombreUsuario: this.form.controls["usuario"]!.value
      }
      return lastValueFrom(this.usuarioService.validarNombreUsuario(params));
    },
    crearUsuario: () => {
      let params: CrearUsuarioRequest = {
        nombreUsuario: this.form.controls["usuario"]!.value,
        clave: this.form.controls["clave"]!.value,
        correo: this.form.controls["correo"]!.value,
        nombre: this.form.controls["nombre"]!.value,
        apellidoPaterno: this.form.controls["apellidoPaterno"]!.value,
        apellidoMaterno: this.form.controls["apellidoMaterno"]!.value,
      }
      return lastValueFrom(this.usuarioService.crearUsuario(params));
    }
  }

}
