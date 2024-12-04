import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { IntervaloEnGrafica } from 'src/app/base/Models/IntervaloEnGrafica';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';

@Component({
  selector: 'app-vista-objetivo',
  templateUrl: './vista-objetivo.component.html',
  styleUrls: ['./vista-objetivo.component.scss']
})
export class VistaObjetivoComponent implements OnInit{

  @Input() datoObjetivo : any;
  @Input() objetivo:string = '';
  @Input() data : any [] = [];

  imgCheck= '';
  imgWarn='';
  isBrowser = false;
  indicador: IntervaloEnGrafica = {minY: 0, maxY: 0, id_indicador: 0};

  constructor(private servicio: DataDynamic,  @Inject(PLATFORM_ID) private platformId: any
  )
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.cargarDiagrama();
    }
  }
  ngOnInit(): void {
   console.log(this.datoObjetivo);
   if(this.datoObjetivo?.ID_INDICADOR_ESTR_TRANS === 12000003){
    this.indicador.minY = 0.345
    this.indicador.maxY = 0.385
    this.indicador.id_indicador = this.datoObjetivo?.ID_INDICADOR_ESTR_TRANS
   }
   
  }




cargarDiagrama() {
  this.imgCheck= this.servicio.getImagen('iconoindicador_02.jpg');
  this.imgWarn=this.servicio.getImagen('iconoindicador_01.jpg');
}

}
