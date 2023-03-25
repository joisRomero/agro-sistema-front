import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AbonosComponent } from './view/abonos/abonos.component';
import { AgroquimicosComponent } from './view/agroquimicos/agroquimicos.component';
import { CompraAbonosComponent } from './view/compra-abonos/compra-abonos.component';
import { CompraAgroquimicoComponent } from './view/compra-agroquimico/compra-agroquimico.component';
import { CultivoComponent } from './view/cultivo/cultivo.component';
import { InicioComponent } from './view/inicio/inicio.component';
import { TipoAgroquimicoComponent } from './view/tipo-agroquimico/tipo-agroquimico.component';

export const privateModuleRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/intranet/inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        title: 'Inicio',
        component: InicioComponent
      },
      {
        path: 'agroquimico',
        title: 'Agroquímicos',
        component: AgroquimicosComponent
      },
      {
        path: 'tipo-agroquimicos',
        title: 'Tipo de agroquímicos',
        component: TipoAgroquimicoComponent
      },
      {
        path: 'compra-agroquimicos',
        title: 'Compra de agroquímicos',
        component: CompraAgroquimicoComponent
      },
      {
        path: 'abonos',
        title: 'Abonos',
        component: AbonosComponent
      },
      {
        path: 'compra-abonos',
        title: 'Abonos',
        component: CompraAbonosComponent
      },
      {
        path: 'cultivos',
        title: 'Cultivos',
        component: CultivoComponent
      },



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(privateModuleRoutes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
