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
import { VerDetalleSociedadComponent } from './view/ver-detalle-sociedad/ver-detalle-sociedad.component';
import { VerDetalleCampaniaComponent } from './view/ver-detalle-campania/ver-detalle-campania.component';
import { VerDetalleCosechaComponent } from './view/ver-detalle-campania/components/ver-detalle-cosecha/ver-detalle-cosecha.component';
import { NuevoCosechaComponent } from './view/ver-detalle-campania/components/nuevo-cosecha/nuevo-cosecha.component';
import { NuevoDetalleCosechaComponent } from './view/ver-detalle-campania/components/nuevo-detalle-cosecha/nuevo-detalle-cosecha.component';
import { EliminarCosechaComponent } from './view/ver-detalle-campania/components/eliminar-cosecha/eliminar-cosecha.component';
import { PerfilUsuarioComponent } from './view/perfil-usuario/perfil-usuario.component';
import { AlertEliminarUsuarioComponent } from './view/perfil-usuario/components/alert-eliminar-usuario/alert-eliminar-usuario.component';

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
    VerDetalleSociedadComponent,
    VerDetalleCampaniaComponent,
    VerDetalleCosechaComponent,
    NuevoCosechaComponent,
    NuevoDetalleCosechaComponent,
    EliminarCosechaComponent,
    PerfilUsuarioComponent,
    AlertEliminarComponent,
    AlertEliminarUsuarioComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
