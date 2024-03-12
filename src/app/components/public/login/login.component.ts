import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { PerfilUsuarioVars } from '../../private/view/perfil-usuario/perfil-usuario-vars';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public mensajesError = {
    usuario: "El campo es obligatorio.",
    clave: "El campo es obligatorio."
  }
  public loginResponse!: LoginResponse;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private loginService: LoginService,
    public perfilUsuarioVars: PerfilUsuarioVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      usuario: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]],
      clave: ['', [Validators.required, SpaceValidator.noWhitespaceValidator]]
    });
  }

  public async iniciarSesion(){
    localStorage.clear();
    
    this.form.markAllAsTouched();
    if(this.form.valid){
      let responseToken = await this.services.crearToken();
      if (responseToken.status == 200){
        localStorage.clear();
        localStorage.setItem('token', responseToken.body!.access_token);
        let responseLogin = await this.services.login();
        if (responseLogin.status == 200) {
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
    }
  }

  private services = {
    crearToken: () => {
      const encodedWordUsuario = CryptoJS.enc.Utf8.parse(this.form!.controls['usuario']!!.value.trim());
      const encodedUsuario = CryptoJS.enc.Base64.stringify(encodedWordUsuario);
      const encodedWordClave = CryptoJS.enc.Utf8.parse(this.form!.controls['clave']!!.value.trim());
      const encodedClave = CryptoJS.enc.Base64.stringify(encodedWordClave);
      let params: TokenRequest = {
        usuario: encodedUsuario,
        clave: encodedClave,
      }
      return lastValueFrom(this.tokenService.crearToken(params));
    },
    login: () => {
      const encodedWordUsuario = CryptoJS.enc.Utf8.parse(this.form!.controls['usuario']!!.value.trim());
      const encodedUsuario = CryptoJS.enc.Base64.stringify(encodedWordUsuario);
      const encodedWordClave = CryptoJS.enc.Utf8.parse(this.form!.controls['clave']!!.value.trim());
      const encodedClave = CryptoJS.enc.Base64.stringify(encodedWordClave);
      let params: LoginRequest = {
        usuario: encodedUsuario,
        clave: encodedClave,
      }
      return lastValueFrom(this.loginService.obtenerUsuario(params));
    }
  }

}
