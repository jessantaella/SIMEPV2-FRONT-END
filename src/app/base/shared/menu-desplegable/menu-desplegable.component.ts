import { Component, Input } from '@angular/core';
import { ObjetivoSectorial } from '../../Models/ObjetivoSectorial';

@Component({
  selector: 'app-menu-desplegable',
  templateUrl: './menu-desplegable.component.html',
  styleUrls: ['./menu-desplegable.component.scss']
})
export class MenuDesplegableComponent {
  @Input() listaObjetivosSectoriales: ObjetivoSectorial[] = [];

}
