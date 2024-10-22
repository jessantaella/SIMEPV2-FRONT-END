import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmbitosocialService } from '../services/ambitosocial.service';

@Component({
  selector: 'app-detalle-informacion',
  templateUrl: './detalle-informacion.component.html',
  styleUrls: ['./detalle-informacion.component.scss']
})
export class DetalleInformacionComponent implements OnInit{
  
  idIndicador: number = 0;
  informacion:any;
  
  
  constructor(private ambitosocialService:AmbitosocialService,private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.idIndicador = params.get('idIndicador') ? parseInt(params.get('idIndicador')!) : 0;
      console.log('Valor de idIndicador:', this.idIndicador);
      this.obtenerInformacionIndicadorDetalle();
    });
  }

  obtenerInformacionIndicadorDetalle(){
    this.ambitosocialService.getinformacionIndicador(this.idIndicador).subscribe(
      res=>{
        this.informacion = res?.Data[0];
        console.log('Información del indicador',this.informacion);
      }
    )
  }

  getInfo(){
    return this.informacion
  }

}
