import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom , interval, Subscription} from 'rxjs';
import { CambiarClaveRecuperacionCuentaRequest } from 'src/app/models/requests/cambiarClaveRecuperacionCuentaRequest';
import { GenerarCodigoRecuperacionCuentaRequest } from 'src/app/models/requests/generarCodigoRecuperacionCuentaRequest';
import { ValidarCodigoRecuperacionCuentaRequest } from 'src/app/models/requests/validarCodigoRecuperacionCuentaRequest';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SpaceValidator } from 'src/app/validators/white-space.validator';
import { GeneralAlertInformationVars } from '../../shared/general-alert-information/general-alert-information.vars';
import { LoginRequest } from 'src/app/models/requests/loginRequest';
import { LoginService } from 'src/app/services/login.service';
import { TokenRequest } from 'src/app/models/requests/tokenRequest';
import { TokenService } from 'src/app/services/token.service';
import { Usuario } from 'src/app/models/usuario';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-olvidado-clave',
  templateUrl: './olvidado-clave.component.html',
  styleUrls: ['./olvidado-clave.component.scss']
})
export class OlvidadoClaveComponent implements OnInit, OnDestroy{

  public formPaso1!: FormGroup;
  public formPaso2!: FormGroup;
  public formPaso3!: FormGroup;
  public respuestaRespuestaClave: boolean = true;
  public habilitarAlPaso1: boolean = true;
  public habilitarAlPaso2: boolean = false;
  public habilitarAlPaso3: boolean = false;
  private correoElectronico: string = "";
  private usuario: string = "";  
  public tiempo: number = 60;
  private subscription!: Subscription;
  private source = interval(1000);
  public activarReenvioCorreo: boolean = false;

  public mensajesError = {
    correo: "El campo es obligatorio. Ingrese un correo electrónico válido.",
    clave: "El campo es obligatorio.",
    repetirClave: "El campo es obligatorio.",
    codigo: "El campo es obligatorio.",
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    public alertInformationService: GeneralAlertInformationVars,
    private loginService: LoginService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
  }

  ngOnDestroy() {
    this.subscription = this.source.subscribe(()=>this.disminuirNumero());
    this.subscription.unsubscribe();
  }

  disminuirNumero(): void {
    if(this.tiempo == 0) {
      this.subscription.unsubscribe();
      this.activarReenvioCorreo = true;
    }else{
      this.tiempo--;
    }
  }

  public reenviarCodigo() {
    this.tiempo = 60
    this.subscription = this.source.subscribe(()=>this.disminuirNumero());
    this.activarReenvioCorreo = false;
    this.enviarCodigoRecuperacion();
  }

  private iniciarControles() {
    this.formPaso1 = this.fb.nonNullable.group({
      correo: ['', [Validators.required, SpaceValidator.noWhitespaceValidator, Validators.email]]
    });
    this.formPaso2 = this.fb.nonNullable.group({
      codigo: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]]
    });
    this.formPaso3 = this.fb.nonNullable.group({
      clave: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      repetirClave: ['', [Validators.required, SpaceValidator.noWhitespaceValidator, this.validarRepetirClaveValidator()]],
    });
  }

  public validarRepetirClaveValidator(): ValidatorFn | null {
    return () => {
      return this.respuestaRespuestaClave ? null : { isValid: false };
    };
  }
  

  public validarRepetirClave() {
    this.respuestaRespuestaClave = this.formPaso3.controls["clave"]!.value == this.formPaso3.controls["repetirClave"]!.value;
    if(this.formPaso3.controls["clave"]!.value == "" || this.formPaso3.controls["clave"]!.value == ""){
      this.mensajesError.repetirClave = "El campo es obligatorio."
    }
    if(!this.respuestaRespuestaClave) {
      this.mensajesError.repetirClave = "Las contraseñas tienen que ser iguales."
    }
    
    this.formPaso3.controls["repetirClave"]!.updateValueAndValidity();
  }

  public async enviarCodigoRecuperacion(){
    this.formPaso1.markAllAsTouched();
    if(this.formPaso1.valid){
      let response = await this.service.generarCodigoRecuperacionCuenta();
      if(response.status == 200){
        this.habilitarAlPaso1 = false;
        this.habilitarAlPaso2 = true;
        this.correoElectronico = this.formPaso1.controls["correo"]!.value;
        this.alertInformationService.mostrar = true;
        this.alertInformationService.titulo = "Recuperar cuenta";
        this.alertInformationService.texto = "Se ha enviado un código a su correo electrónico.";
        this.subscription = this.source.subscribe(()=>this.disminuirNumero());
      }
    }
  }

  public async verificarCodigoRecuperacion(){
    this.formPaso2.markAllAsTouched();
    if(this.formPaso2.valid){
      let response = await this.service.validarCodigoRecuperacionCuenta();
      if(response.status == 200){
        this.habilitarAlPaso2 = false;
        this.habilitarAlPaso3 = true
      }
    }
  }

  public async cambioNuevaClave(){
    this.formPaso3.markAllAsTouched();
    if(this.formPaso3.valid){
      let response = await this.service.cambiarClaveRecuperacionCuenta();
      if(response.status == 200){
        this.usuario = response.body!.nombreUsuario;
        localStorage.clear();
        localStorage.clear();
        let responseToken = await this.service.crearToken();
        
        if (responseToken.status != 200){
          return 
        }

        localStorage.setItem('token', responseToken.body!.access_token);
        let responseLogin = await this.service.login();

        if (responseLogin.status != 200) {
          return
        }

        let loginResponse = responseLogin.body!;
        let usuario: Usuario = {
          nombreUsuario: loginResponse.nombreUsuario,
          idUsuario: loginResponse.idUsuario,
          nombreCompleto: loginResponse.nombreCompleto
        }
        localStorage.setItem("usuario", JSON.stringify(usuario));
        this.alertInformationService.mostrar = true;
        this.alertInformationService.titulo = "Recuperar cuenta";
        this.alertInformationService.texto = "Se ha recuperado su cuenta.";
        this.router.navigate(["intranet"]);
      }
    }
  }

  public cancelar() {
    this.router.navigate(["/login"]);
  }

  public service = {
    generarCodigoRecuperacionCuenta: () => {
      let params : GenerarCodigoRecuperacionCuentaRequest = {
        correo: this.formPaso1.controls["correo"]!.value,
      }
      return lastValueFrom(this.usuarioService.generarCodigoRecuperacionCuenta(params));
    },
    validarCodigoRecuperacionCuenta: () => {
      let params: ValidarCodigoRecuperacionCuentaRequest = {
        correo: this.correoElectronico,
        token: this.formPaso2.controls["codigo"]!.value,
      }
      return lastValueFrom(this.usuarioService.validarCodigoRecuperacionCuenta(params));
    },
    cambiarClaveRecuperacionCuenta: () => {
      const encodedWordClave = CryptoJS.enc.Utf8.parse(this.formPaso3!.controls['clave']!.value.trim());
      const encodedClave = CryptoJS.enc.Base64.stringify(encodedWordClave);
      let params: CambiarClaveRecuperacionCuentaRequest = {
        clave: encodedClave,
        correo: this.correoElectronico
      }
      return lastValueFrom(this.usuarioService.cambiarClaveRecuperacionCuenta(params))
    },
    login: () => {
      const encodedWordUsuario = CryptoJS.enc.Utf8.parse(this.usuario);
      const encodedUsuario = CryptoJS.enc.Base64.stringify(encodedWordUsuario);
      const encodedWordClave = CryptoJS.enc.Utf8.parse(this.formPaso3!.controls['clave']!.value.trim());
      const encodedClave = CryptoJS.enc.Base64.stringify(encodedWordClave);
      let params: LoginRequest = {
        usuario: encodedUsuario,
        clave: encodedClave
      }
      return lastValueFrom(this.loginService.obtenerUsuario(params));
    },
    crearToken: () => {
      const encodedWordUsuario = CryptoJS.enc.Utf8.parse(this.usuario);
      const encodedUsuario = CryptoJS.enc.Base64.stringify(encodedWordUsuario);
      const encodedWordClave = CryptoJS.enc.Utf8.parse(this.formPaso3!.controls['clave']!.value.trim());
      const encodedClave = CryptoJS.enc.Base64.stringify(encodedWordClave);
      let params: TokenRequest = {
        usuario: encodedUsuario,
        clave: encodedClave,
      }
      return lastValueFrom(this.tokenService.crearToken(params));
    },
  }
  

}
