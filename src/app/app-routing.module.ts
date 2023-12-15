import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './base/inicio/inicio.component';

const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' },
  {
    path:'',
    component:InicioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
