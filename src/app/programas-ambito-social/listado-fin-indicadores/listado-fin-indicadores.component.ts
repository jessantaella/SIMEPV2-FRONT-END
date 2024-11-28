import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-fin-indicadores',
  templateUrl: './listado-fin-indicadores.component.html',
  styleUrls: ['./listado-fin-indicadores.component.scss']
})

export class ListadoFinIndicadoresComponent implements OnInit {

  redes: any;
  nombreSistema: any;
  alto = 100;
  esMovil = false;
  esTablet = false;
  esEscritorio = false;
  isBrowser = false;
  @ViewChild('planeacion') planeacion!: ElementRef;

  items: { title: string, subItems: any }[] = [];

  datos!: { pCiclo: string; pRamo: string; pUnidad: string; };

  listaPorgramas:any;
  dependencia='';
  ciclo='';
  mosaico: { NOM_ARCHIVO:string,LVL:number,CICLO:string,RAMO:string,UNIDAD:string,LIGA:string,DESCRIPCION:string,DEPENDENCIA:string}[]=[];

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private ambitoService: AmbitosocialService,
    private servicio: DataDynamic,
    private router: Router,
    private route: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.datos = {
        pCiclo: params.get('pCiclo') ?? '',
        pRamo: params.get('pRamo') ?? '',
        pUnidad: params.get('pUnidad') ?? ''
      };
      this.consultaInformacion();
      this.obtenerMosaico();
    });
  }

  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = res?.simeps?.opciones[1].titulo;
        this.redes = res.generales.redes;
      });
    }
  }

  consultaInformacion() {
    this.ambitoService.obtenerlistadoIndicadoresPoliticaSocial(this.datos.pCiclo,this.datos.pRamo,this.datos.pUnidad).subscribe(
      res=>{
        console.log({res});
        this.listaPorgramas = res?.Data.filter((item: any) => item.INDICADORES?.length > 0)
      }
    )
  }


  redirigiraDetalle(idIndicador:number,idMatriz:number,nivel:number,dependencia:string){
    this.router.navigate(['/DetalleIndicadorFin',idIndicador,idMatriz,nivel,dependencia,this.datos.pCiclo,this.datos.pRamo]);
  }

  obtenerMosaico() {
    this.ambitoService.obtenerImagenesFin(this.datos.pCiclo).subscribe(
      res => {
        // Filtrar por CICLO y RAMO
        this.mosaico = res?.Data.filter(
          (item: { RAMO: string; CICLO: string }) =>
            item.RAMO === this.datos.pRamo && item.CICLO === this.datos.pCiclo
        );

        // Mostrar la dependencia si hay datos
        if (this.mosaico?.length > 0) {
          this.dependencia = this.mosaico[0].DEPENDENCIA;
          this.ciclo = this.mosaico[0].CICLO;
          console.log('Dependencia:', this.dependencia);
        } else {
          this.dependencia = 'No se encontraron resultados.';
        }
      },
      error => {
        console.error('Error al obtener las imágenes:', error);
      }
    );
  }

}
