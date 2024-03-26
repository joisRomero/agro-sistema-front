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
import { NuevoEditarTrbajadorComponent } from './view/trabajador/components/nuevo-editar-trbajador/nuevo-editar-trbajador.component';
import { NuevoEditarGastosComponent } from './view/gastos/components/nuevo-editar-gastos/nuevo-editar-gastos.component';
import { AlertEliminarGastosComponent } from './view/gastos/components/alert-eliminar-gastos/alert-eliminar-gastos.component';
import { AlertEliminarTrbajadorComponent } from './view/trabajador/components/alert-eliminar-trbajador/alert-eliminar-trbajador.component';
import { TrabajadorComponent } from './view/trabajador/trabajador.component';
import { GastosComponent } from './view/gastos/gastos.component';
import { TipoTrabajadorComponent } from './view/tipo-trabajador/tipo-trabajador.component';
import { TipoActividadComponent } from './view/tipo-actividad/tipo-actividad.component';
import { TipoGastoComponent } from './view/tipo-gasto/tipo-gasto.component';
import { ModalNuevoEditarTipoActividadComponent } from './view/tipo-actividad/components/modal-nuevo-editar-tipo-actividad/modal-nuevo-editar-tipo-actividad.component';
import { AlertEliminarTipoActividadComponent } from './view/tipo-actividad/components/alert-eliminar-tipo-actividad/alert-eliminar-tipo-actividad.component';
import { AlertEliminarGastosCampaniaComponent } from './view/gastos-campania/components/alert-eliminar-gastos-campania/alert-eliminar-gastos-campania.component';
import { NuevoEditarGastosCampaniaComponent } from './view/gastos-campania/components/nuevo-editar-gastos-campania/nuevo-editar-gastos-campania.component';
import { ModalNuevoEditarTipoGastoComponent } from './view/tipo-gasto/components/modal-nuevo-editar-tipo-gasto/modal-nuevo-editar-tipo-gasto.component';
import { AlertEliminarTipoGastoComponent } from './view/tipo-gasto/components/alert-eliminar-tipo-gasto/alert-eliminar-tipo-gasto.component';
import { ModalNuevoEditarTipoTrabajadorComponent } from './view/tipo-trabajador/components/modal-nuevo-editar-tipo-trabajador/modal-nuevo-editar-tipo-trabajador.component';
import { AlertEliminarTipoTrabajadorComponent } from './view/tipo-trabajador/components/alert-eliminar-tipo-trabajador/alert-eliminar-tipo-trabajador.component';
import { NuevoEditarAbonoComponent } from './view/abonos/components/nuevo-editar-abono/nuevo-editar-abono.component';
import { AlertEliminarAbonoComponent } from './view/abonos/components/alert-eliminar-abono/alert-eliminar-abono.component';
import { NuevoEditarAgroquimicoComponent } from './view/agroquimicos/components/nuevo-editar-agroquimico/nuevo-editar-agroquimico.component';
import { AlertEliminarAgroquimicoComponent } from './view/agroquimicos/components/alert-eliminar-agroquimico/alert-eliminar-agroquimico.component';
import { AbonacionComponent } from './view/abonacion/abonacion.component';
import { FumigacionComponent } from './view/fumigacion/fumigacion.component';
import { AgregarEditarAbonacionComponent } from './view/abonacion/components/agregar-editar-abonacion/agregar-editar-abonacion.component';
import { AlertEliminarAbonacionComponent } from './view/abonacion/components/alert-eliminar-abonacion/alert-eliminar-abonacion.component';
import { NuevoEditarFumigacionComponent } from './view/fumigacion/components/nuevo-editar-fumigacion/nuevo-editar-fumigacion.component';
import { AgregarEditarCosechaComponent } from './view/cosechas-campania/components/agregar-editar-cosecha/agregar-editar-cosecha.component';
import { AlertEliminarCosechaComponent } from './view/cosechas-campania/components/alert-eliminar-cosecha/alert-eliminar-cosecha.component';
import { AgregarDetalleCosechaComponent } from './view/cosechas-campania/components/agregar-detalle-cosecha/agregar-detalle-cosecha.component';
import { AlertRetirarSociedadComponent } from './view/integrantes-sociedad/components/alert-retirar-sociedad/alert-retirar-sociedad.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AlertReabrirCampaniaComponent } from './view/ver-detalle-sociedad/components/alert-reabrir-campania/alert-reabrir-campania.component'

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
    TrabajadorComponent,
    GastosComponent,
    TipoTrabajadorComponent,
    TipoActividadComponent,
    TipoGastoComponent,
    ModalNuevoEditarTipoActividadComponent,
    AlertEliminarTipoActividadComponent,
    AlertEliminarGastosCampaniaComponent,
    NuevoEditarGastosCampaniaComponent,
    NuevoEditarAbonoComponent,
    AlertEliminarAbonoComponent,
    NuevoEditarAgroquimicoComponent,
    AlertEliminarAgroquimicoComponent,
    ModalNuevoEditarTipoGastoComponent,
    AlertEliminarTipoGastoComponent,
    ModalNuevoEditarTipoTrabajadorComponent,
    AlertEliminarTipoTrabajadorComponent,
    AbonacionComponent,
    FumigacionComponent,
    AgregarEditarAbonacionComponent,
    AlertEliminarAbonacionComponent,
    NuevoEditarFumigacionComponent,
    AgregarEditarCosechaComponent,
    AlertEliminarCosechaComponent,
    AgregarDetalleCosechaComponent,
    AlertRetirarSociedadComponent,
    AlertReabrirCampaniaComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ]
})
export class PrivateModule { }
