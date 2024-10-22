import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './base/inicio/inicio.component';
import { ModuloPlaneacionComponent } from './base/modulo-planeacion/modulo-planeacion.component';
import { ProgramasIndicadores1924Component } from './base/programas-indicadores1924/programas-indicadores1924.component';
import { ProgramasIndicadores1318Component } from './base/programas-indicadores1318/programas-indicadores1318.component';
import { IndicadorSectorial1924Component } from './base/indicador-sectorial1924/indicador-sectorial1924.component';
import { IndicadorSectorial1318Component } from './base/indicador-sectorial1318/indicador-sectorial1318.component';
import { Pnd2013Component } from './plan-nacional/pnd2013/pnd2013.component';
import { Indice20132018Component } from './programas-ambito-social/indice20132018/indice20132018.component';
import { DetalleIndicadorComponent } from './programas-ambito-social/detalle-indicador/detalle-indicador.component';

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
    path:'MosaicoSectores',
    component:ProgramasIndicadores1318Component,
  },
  {
    path:'IndicadorSectorial19-24',
    component:IndicadorSectorial1924Component,
  },
  {
    path:'IndicadorSectorial',
    component:IndicadorSectorial1318Component,
  },
  {
    path:'PlanNacionalDesarrollo2013-2018',
    component:Pnd2013Component,
  },
  {
    path:'ProgramasDerivados2013-2018',
    component:Indice20132018Component,
  },
  {
    path:'DetalleIndicador/:idSector',
    component:DetalleIndicadorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
