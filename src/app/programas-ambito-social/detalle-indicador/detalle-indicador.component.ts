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

  idProgramaSect: number | null = null;
  mostrarDetalles : boolean = false;

  previousIdSector: string | null = null;
  plantilla = '';

  listaSectores: any[] = [];
  listaEstadisticasBasicasSector: any[] =[];
  listaProgramasSectoriales: any[] =[];
  listaObjetivosSectoriales : any[] = [];
  loadingProgramasSectoriales = true;
  barraVisible: boolean = true; // Inicialmente visible
  imgDescarga ='';
  programa : any;
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
    if (this.isBrowser) {
      this.cargarImg();
    }
    this.scrollToTop();
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
      console.log(this.idSector);
      this.consultaEstadisticasBasicas(this.idSector ? parseInt(this.idSector) : 0);
      this.consultaProgramasSectoriales(this.idSector ? parseInt(this.idSector) : 0);
    });

  this.route.queryParamMap.subscribe(p=>{
    let idIndicador= p.get('idIndicador');
      console.info(idIndicador)
      if(idIndicador){
        console.warn('si debe mostrarse')
        this.mostrarDetalles = true;
      }
  })
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
    this.mostrarDetalles = false;
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


onIdProgramaSectChange(newIdProgramaSect: number | null) {
  if(newIdProgramaSect !== this.idProgramaSect){
    this.mostrarDetalles = true;
    this.idProgramaSect = newIdProgramaSect;
  }

  console.log('Nuevo idProgramaSect:', this.idProgramaSect);
}

descargarExcel() {
  this.ambitosocialService.obtenerUrlDescarga().subscribe({
    next: (blob: Blob) => {
      console.log('Blob recibido:', blob);

      // Crear una URL para el Blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Crear un enlace temporal
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Base_de_Datos_del_PND';
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    },
    error: (error) => {
      console.error('Error al obtener el archivo de descarga:', error);
    }
  });
}

  cargarImg() {
    const baseUrl = this.servicio.getInfoImg('');
    this.imgDescarga = `${baseUrl}Icons-new%20DB/NUBE.jpg`;
    }

    onProgramaSeleccionado(programa : any){
      this.programa = programa
    }

    scrollToTop() {
      window.scrollTo(0, 0);
    }
}
