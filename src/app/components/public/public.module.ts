import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { OlvidadoClaveComponent } from './olvidado-clave/olvidado-clave.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrarComponent,
    OlvidadoClaveComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PublicModule { }
