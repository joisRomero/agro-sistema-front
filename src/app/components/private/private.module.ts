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
import { DarDeBajaSociedadComponent } from './view/sociedades/components/dar-de-baja-sociedad/dar-de-baja-sociedad.component';
import { NuevoEditarSociedadComponent } from './view/sociedades/components/nuevo-editar-sociedad/nuevo-editar-sociedad.component';
import { PerfilUsuarioComponent } from './view/perfil-usuario/perfil-usuario.component';
import { AlertEliminarUsuarioComponent } from './view/perfil-usuario/components/alert-eliminar-usuario/alert-eliminar-usuario.component';
import { CampaniaSociedadComponent } from './view/ver-detalle-sociedad/components/campania-sociedad/campania-sociedad.component';
import { IntegrantesSociedadComponent } from './view/integrantes-sociedad/integrantes-sociedad.component';
import { ModalNuevoEditarCampaniaSociedadComponent } from './view/ver-detalle-sociedad/components/modal-nuevo-editar-campania-sociedad/modal-nuevo-editar-campania-sociedad.component';
import { ActividadesCampaniaComponent } from './view/actividades-campania/actividades-campania.component';
import { GastosCampaniaComponent } from './view/gastos-campania/gastos-campania.component';
import { CosechasCampaniaComponent } from './view/cosechas-campania/cosechas-campania.component';
import { ModalNuevoEditarIntegrantesSociedadComponent } from './view/integrantes-sociedad/components/modal-nuevo-editar-integrantes-sociedad/modal-nuevo-editar-integrantes-sociedad.component';
import { AlertAsignarDesasignarAdministradorComponent } from './view/integrantes-sociedad/components/alert-asignar-desasignar-administrador/alert-asignar-desasignar-administrador.component';
import { FinalizarCampaniaComponent } from './view/ver-detalle-sociedad/components/finalizar-campania/finalizar-campania.component';
import { AlerEliminarCampaniaComponent } from './view/ver-detalle-sociedad/components/aler-eliminar-campania/aler-eliminar-campania.component';
import { AlerEliminarActividadComponent } from './view/actividades-campania/components/aler-eliminar-actividad/aler-eliminar-actividad.component';
import { NuevoEditarActividadesComponent } from './view/actividades-campania/components/nuevo-editar-actividades/nuevo-editar-actividades.component';
import { NuevoEditarTrbajadorComponent } from './view/actividades-campania/components/nuevo-editar-trbajador/nuevo-editar-trbajador.component';
import { NuevoEditarGastosComponent } from './view/actividades-campania/components/nuevo-editar-gastos/nuevo-editar-gastos.component';
import { AlertEliminarGastosComponent } from './view/actividades-campania/components/alert-eliminar-gastos/alert-eliminar-gastos.component';
import { AlertEliminarTrbajadorComponent } from './view/actividades-campania/components/alert-eliminar-trbajador/alert-eliminar-trbajador.component';

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
    DarDeBajaSociedadComponent,
    NuevoEditarSociedadComponent,
    PerfilUsuarioComponent,
    AlertEliminarComponent,
    AlertEliminarUsuarioComponent,
    CampaniaSociedadComponent,
    IntegrantesSociedadComponent,
    ModalNuevoEditarCampaniaSociedadComponent,
    ActividadesCampaniaComponent,
    GastosCampaniaComponent,
    CosechasCampaniaComponent,
    ModalNuevoEditarIntegrantesSociedadComponent,
    AlertAsignarDesasignarAdministradorComponent,
    FinalizarCampaniaComponent,
    AlerEliminarCampaniaComponent,
    AlerEliminarActividadComponent,
    NuevoEditarActividadesComponent,
    NuevoEditarTrbajadorComponent,
    NuevoEditarGastosComponent,
    AlertEliminarGastosComponent,
    AlertEliminarTrbajadorComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
