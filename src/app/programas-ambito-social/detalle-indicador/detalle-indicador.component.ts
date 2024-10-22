import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { AmbitosocialService } from '../services/ambitosocial.service';

@Component({
  selector: 'app-detalle-indicador',
  templateUrl: './detalle-indicador.component.html',
  styleUrls: ['./detalle-indicador.component.scss']
})
export class DetalleIndicadorComponent {
  nivelSeleccionado: any;
  menuSeleccionado = 1;
  redes: any;
  nombreSistema: any;
  auxMascara = false;
  fontSizeTitulo = '24px';
  fontSizeTituloNormal = '20px';
  isBrowser = false;
  celular = false;
  @ViewChild('planeacion')
  planeacion!: ElementRef;
  alto=100;
  esMovil = false;
  esTablet = false;
  esEscritorio = false;
  idSector: string | null = null;
  previousIdSector: string | null = null; 
  plantilla = '';

  listaSectores: any[] = [];
  listaEstadisticasBasicasSector: any[] =[];
  listaProgramasSectoriales: any[] =[];
  listaObjetivosSectoriales : any[] = [];
  loadingProgramasSectoriales = true;
  barraVisible: boolean = true; // Inicialmente visible

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private servicio: DataDynamic,
    private router: Router,
    private route: ActivatedRoute,
    private ambitosocialService:AmbitosocialService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    this.consultaSectores();
  }



  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setInterval(() => {
        let aux = this.planeacion?.nativeElement.offsetHeight;
        this.alto = aux + aux / 6;
      }, 10);
    }
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idSector = params.get('idSector');
      console.log(this.idSector); // Aquí puedes ver el valor en la consola
      this.consultaEstadisticasBasicas(this.idSector ? parseInt(this.idSector) : 0);
      this.consultaProgramasSectoriales(this.idSector ? parseInt(this.idSector) : 0);
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

  /**
   *  Cambia opción de select 
   */

  onSectorChange(event: Event) {
    // Si necesitas el valor seleccionado
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Sector seleccionado:', selectedValue);
    this.router.navigate(['DetalleIndicador', selectedValue]);

    // Realiza la lógica adicional que necesites
    this.consultaEstadisticasBasicas(Number(selectedValue));
    this.consultaProgramasSectoriales(Number(selectedValue));
    this.idSector = selectedValue;
  }


  // --------- Inicia función de Monitoreo

  consultaSectores(){
    this.ambitosocialService.getSectores(0).subscribe(
      res=>{
        console.log(res?.Data);
        this.listaSectores = res?.Data;
      })
  }

  consultaEstadisticasBasicas(idSector:number){
    this.ambitosocialService.getEstadisticasBasicas(idSector).subscribe(
      res=>{
        this.listaEstadisticasBasicasSector = res?.Data;
      console.log(res);
    })
  }

/** Trae todos los Programas sectoriales */

consultaProgramasSectoriales(idSector:number){
  this.ambitosocialService.getTodosProgramasSectoriales().subscribe(
    res=>{
      this.listaProgramasSectoriales = res?.Data.filter((sector: { ID_SECTOR: number; }) => sector.ID_SECTOR === idSector);
      this.loadingProgramasSectoriales = false;
      console.log(this.listaProgramasSectoriales);
    }
  )
}


toggleBarra() {
  this.barraVisible = !this.barraVisible;
}
  
}
