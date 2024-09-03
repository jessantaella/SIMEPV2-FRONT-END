import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './base/inicio/inicio.component';
import { ModuloPlaneacionComponent } from './base/modulo-planeacion/modulo-planeacion.component';
import { ProgramasIndicadores1924Component } from './base/programas-indicadores1924/programas-indicadores1924.component';
import { IndicadorSectorial1924Component } from './base/indicador-sectorial1924/indicador-sectorial1924.component';

const routes: Routes = [
  { path: 'inicio', component:InicioComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path:'inicio',
    component:InicioComponent,
  },
  {
    path:'modulo-planeacion',
    component:ModuloPlaneacionComponent,
  },
  {
    path:'MosaicoSectores19-24',
    component:ProgramasIndicadores1924Component,
  },
  {
    path:'MosaicoSectores19-24',
    component:ProgramasIndicadores1924Component,
  },
  {
    path:'IndicadorSectorial19-24',
    component:IndicadorSectorial1924Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
