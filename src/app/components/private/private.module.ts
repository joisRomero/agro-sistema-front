import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { CultivoComponent } from './view/cultivo/cultivo.component';
import { InicioComponent } from './view/inicio/inicio.component';
import { AbonoComponent } from './view/abono/abono.component';
import { ModalNuevoEditarCultivoComponent } from './view/cultivo/components/modal-nuevo-editar-cultivo/modal-nuevo-editar-cultivo.component';
import { AlertEliminarComponent } from './view/cultivo/components/alert-eliminar/alert-eliminar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    CultivoComponent,
    InicioComponent,
    AbonoComponent,
    ModalNuevoEditarCultivoComponent,
    AlertEliminarComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
