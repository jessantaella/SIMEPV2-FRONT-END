import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vista-objetivo',
  templateUrl: './vista-objetivo.component.html',
  styleUrls: ['./vista-objetivo.component.scss']
})
export class VistaObjetivoComponent {
  
  @Input() dato: any;
}
