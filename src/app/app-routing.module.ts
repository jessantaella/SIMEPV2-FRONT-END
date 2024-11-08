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
import { Indice20192024Component } from './programas-ambito-social/indice20192024/indice20192024.component';
import { DetalleIndicador20192024Component } from './programas-ambito-social/detalle-indicador20192024/detalle-indicador20192024.component';
import { IndicadoresFinComponent } from './programas-ambito-social/indicadores-fin/indicadores-fin.component';
import { ListadoFinIndicadoresComponent } from './programas-ambito-social/listado-fin-indicadores/listado-fin-indicadores.component';
import { Indice201312018Component } from './base/indice201312018/indice201312018.component';
import { FichasMonitoreoComponent } from './programas-ambito-social/fichas-monitoreo/fichas-monitoreo.component';
import { DatosIndicadoresFinComponent } from './programas-ambito-social/datos-indicadores-fin/datos-indicadores-fin.component';

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
    path:'ProgramasDerivados2019-2024',
    component:Indice20192024Component,
  },
  {
    path:'DetalleIndicador/:idSector',
    component:DetalleIndicadorComponent,
  },
  {
    path:'indicadorFin',
    component:IndicadoresFinComponent,
  },
  {
    path:'listado-fin/:pCiclo/:pRamo/:pUnidad',
    component:ListadoFinIndicadoresComponent,
  },
  {
    path:'PlanNacional-ProgramaDerivados',
    component:Indice201312018Component,
  },
  {
    path:'fichasMonitoreo',
    component:FichasMonitoreoComponent,
  },
  {
    path:'DetalleIndicadorFin/:idIndicador/:idMatriz/:nivel/:dependencia',
    component:DatosIndicadoresFinComponent,
  },
  {
    path:'DetalleIndicador19-24/:idSector',
    component:DetalleIndicador20192024Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
