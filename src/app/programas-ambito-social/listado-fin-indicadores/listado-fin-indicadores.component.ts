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
        console.log(res);
        this.listaPorgramas = res?.Data.filter((item: any) => item.INDICADORES?.length > 0)
      }
    )
  }
}
