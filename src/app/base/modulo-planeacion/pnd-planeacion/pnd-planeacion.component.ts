import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-pnd-planeacion',
  templateUrl: './pnd-planeacion.component.html',
  styleUrls: ['./pnd-planeacion.component.scss']
})
export class PndPlaneacionComponent {
  isBrowser: boolean;

  mostrarMoudlo_1:boolean = false;
  mostrarMoudlo_2:boolean = false;
  mostrarMoudlo_3:boolean = false;
  mostrarMoudlo_4:boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any,) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  mostrarModulos(modulo:string){
    switch (modulo) {
      case 'modulo_1':
        if(this.mostrarMoudlo_1){
          this.mostrarMoudlo_1 = false;
        }else{
          this.mostrarMoudlo_1 = true;
        }
        break;
      case 'modulo_2':
        if(this.mostrarMoudlo_2){
          this.mostrarMoudlo_2 = false;
        }else{
          this.mostrarMoudlo_2 = true;
        }
        break;
      case 'modulo_3':
        if(this.mostrarMoudlo_3){
          this.mostrarMoudlo_3 = false;
        }else{
          this.mostrarMoudlo_3 = true;
        }
        break;
      case 'modulo_4':
        if(this.mostrarMoudlo_4){
          this.mostrarMoudlo_4 = false;
        }else{
          this.mostrarMoudlo_4 = true;
        }
        break;
    }
  }

}
