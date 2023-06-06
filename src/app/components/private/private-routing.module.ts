import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { LayoutComponent } from './layout/layout.component';
import { AbonosComponent } from './view/abonos/abonos.component';
import { AgroquimicosComponent } from './view/agroquimicos/agroquimicos.component';
import { CampaniasComponent } from './view/campanias/campanias.component';
import { CompraAbonosComponent } from './view/compra-abonos/compra-abonos.component';
import { CompraAgroquimicoComponent } from './view/compra-agroquimico/compra-agroquimico.component';
import { CultivoComponent } from './view/cultivo/cultivo.component';
import { InicioComponent } from './view/inicio/inicio.component';
import { SociedadesComponent } from './view/sociedades/sociedades.component';
import { TipoAgroquimicoComponent } from './view/tipo-agroquimico/tipo-agroquimico.component';
import { VerDetalleSociedadComponent } from './view/ver-detalle-sociedad/ver-detalle-sociedad.component';
import { VerDetalleCampaniaComponent } from './view/ver-detalle-campania/ver-detalle-campania.component';

export const privateModuleRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [LoginGuard],
        component: InicioComponent
      },
      {
        path: 'inicio',
        title: 'Inicio',
        component: InicioComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'campanias',
        title: 'Campañas',
        component: CampaniasComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'sociedades',
        title: 'Sociedades',
        component: SociedadesComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'sociedades/ver-detalle-sociedad/:id/:nombre',
        title: 'Detalle sociedad',
        component: VerDetalleSociedadComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'sociedades/ver-detalle-campania/:id/:nombre',
        title: 'Detalle campaña',
        component: VerDetalleCampaniaComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'agroquimico',
        title: 'Agroquímicos',
        component: AgroquimicosComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'tipo-agroquimicos',
        title: 'Tipo de agroquímicos',
        component: TipoAgroquimicoComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'compra-agroquimicos',
        title: 'Compra de agroquímicos',
        component: CompraAgroquimicoComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'abonos',
        title: 'Abonos',
        component: AbonosComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'compra-abonos',
        title: 'Abonos',
        component: CompraAbonosComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'cultivos',
        title: 'Cultivos',
        component: CultivoComponent,
        canActivate: [LoginGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(privateModuleRoutes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
