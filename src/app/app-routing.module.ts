import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'intranet',
    loadChildren: () => import('./components/private/private.module').then(m => m.PrivateModule)
  },
  {
    path: "",
    loadChildren: () => import('./components/public/public.module').then(m => m.PublicModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
