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
  id_indicador: number  = 0;

  constructor(private servicio: DataDynamic,  @Inject(PLATFORM_ID) private platformId: any
  )
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.cargarDiagrama();
    }
  }
  ngOnInit(): void {
   console.log("datoObjetivo", this.datoObjetivo);

   this.id_indicador = this.datoObjetivo?.ID_INDICADOR_ESTR_TRANS || this.datoObjetivo?.ID_INDICADOR_PND 
  }




cargarDiagrama() {
  this.imgCheck= this.servicio.getImagen('iconoindicador_02.jpg');
  this.imgWarn=this.servicio.getImagen('iconoindicador_01.jpg');
}

}
