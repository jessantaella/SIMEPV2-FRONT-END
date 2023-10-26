import { Component } from '@angular/core';
import { DataDynamic } from '../services/dinamic-data.services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  generales:any;
  datos:any;
  redes:any;

  constructor(private servicio:DataDynamic) { }

  ngOnInit(): void {
    this.consultarData();
  }

  consultarData(){
    this.servicio.getInformacion().subscribe(
      res=>{
        this.generales = res.generales;
        this.redes = res.generales.redes;
      }
    )
   }

}