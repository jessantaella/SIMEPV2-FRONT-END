import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-objetivo',
  templateUrl: './vista-objetivo.component.html',
  styleUrls: ['./vista-objetivo.component.scss']
})
export class VistaObjetivoComponent implements OnInit{

  @Input() datoObjetivo : any; 
  @Input() objetivo:string = '';
  @Input() data : any [] = [];

  ngOnInit(): void {
   console.log(this.datoObjetivo);
  }
  


  
}
