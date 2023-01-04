import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AbonoComponent } from './view/abono/abono.component';
import { CultivoComponent } from './view/cultivo/cultivo.component';
import { InicioComponent } from './view/inicio/inicio.component';

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
        path: 'cultivo',
        title: 'Cultivo',
        component: CultivoComponent
      },
      {
        path: 'abono',
        title: 'Abono',
        component: AbonoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(privateModuleRoutes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
