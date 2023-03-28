import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { CultivoComponent } from './view/cultivo/cultivo.component';
import { InicioComponent } from './view/inicio/inicio.component';
import { ModalNuevoEditarCultivoComponent } from './view/cultivo/components/modal-nuevo-editar-cultivo/modal-nuevo-editar-cultivo.component';
import { AlertEliminarComponent } from './view/cultivo/components/alert-eliminar/alert-eliminar.component';
import { AgroquimicosComponent } from './view/agroquimicos/agroquimicos.component';
import { TipoAgroquimicoComponent } from './view/tipo-agroquimico/tipo-agroquimico.component';
import { CompraAgroquimicoComponent } from './view/compra-agroquimico/compra-agroquimico.component';
import { AbonosComponent } from './view/abonos/abonos.component';
import { CompraAbonosComponent } from './view/compra-abonos/compra-abonos.component';
import { SociedadesComponent } from './view/sociedades/sociedades.component';
import { CampaniasComponent } from './view/campanias/campanias.component';

@NgModule({
  declarations: [
    LayoutComponent,
    CultivoComponent,
    InicioComponent,
    ModalNuevoEditarCultivoComponent,
    AlertEliminarComponent,
    AgroquimicosComponent,
    TipoAgroquimicoComponent,
    CompraAgroquimicoComponent,
    AbonosComponent,
    CompraAbonosComponent,
    SociedadesComponent,
    CampaniasComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
