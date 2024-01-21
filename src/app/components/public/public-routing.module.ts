import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarLoginGuard } from 'src/app/guards/validar-login.guard';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {
    path: 'login',
    title: "Iniciar sesión",
    component: LoginComponent,
    canActivate: [ValidarLoginGuard]
  },
  {
    path: 'registrar',
    title: "Registrar",
    component: RegistrarComponent,
    canActivate: [ValidarLoginGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
