import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-detalle-indicador20192024',
  templateUrl: './detalle-indicador20192024.component.html',
  styleUrls: ['./detalle-indicador20192024.component.scss']
})
export class DetalleIndicador20192024Component {
  redes: any;
  isBrowser = false;
  nombreSistema: any;

  planeacion!: ElementRef;
  alto=70;
  idSector: string | null = null;

  nivelSeleccionado: any;
  menuSeleccionado = 1;
  auxMascara = false;
  fontSizeTitulo = '24px';
  fontSizeTituloNormal = '20px';
  celular = false;
  @ViewChild('planeacion')
  idProgramaSect: number | null = null;
  mostrarDetalles : boolean = false;

  listaEstadisticasBasicasSector: any[] =[];
  listaSectores: any[] = [];
  listaProgramasSectoriales: any[] =[];
  listaObjetivosSectoriales : any[] = [];
  loadingProgramasSectoriales = true;
  barraVisible: boolean = true; // Inicialmente visible
  esMovil = false;
  esTablet = false;
  esEscritorio = false;
  imdDescargaDatos='';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private servicio: DataDynamic,
    private router: Router,
    private route: ActivatedRoute,
    private ambitosocialService:AmbitosocialService,
    private breakpointObserver: BreakpointObserver,

  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    this.consultaSectores();
    if (this.isBrowser) {
      this.generarUrlImagen();
    }
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

    this.route.queryParamMap.subscribe(p=>{
      let idIndicador= p.get('idIndicador');
        console.info(idIndicador)
        if(idIndicador){
          console.warn('si debe mostrarse')
          this.mostrarDetalles = true;
        }
    });
  }

  onSectorChange(event: Event) {
    this.mostrarDetalles = false;
    // Si necesitas el valor seleccionado
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Sector seleccionado:', selectedValue);
    this.router.navigate(['DetalleIndicador19-24', selectedValue]);

    // Realiza la lógica adicional que necesites
    this.consultaEstadisticasBasicas(Number(selectedValue));
    this.consultaProgramasSectoriales(Number(selectedValue));
    this.idSector = selectedValue;
  }

  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = res?.simeps?.opciones[1].titulo;
        this.redes = res.generales.redes;
      });
    }
  }

  consultaSectores(){
    this.ambitosocialService.getSectores1924(0).subscribe(
      res=>{
        console.log(res?.Data);
        this.listaSectores = res?.Data;
      })
  }

  consultaEstadisticasBasicas(idSector:number){
    this.ambitosocialService.getEstadisticasBasicas1924(idSector).subscribe(
      res=>{
        this.listaEstadisticasBasicasSector = res?.Data;
      console.log("CB"+this.listaEstadisticasBasicasSector);
    })
  }

  consultaProgramasSectoriales(idSector:number){
    this.ambitosocialService.getTodosProgramasSectoriales1924().subscribe(
      res=>{
        this.listaProgramasSectoriales = res?.Data.filter((sector: { ID_SECTOR: number; }) => sector.ID_SECTOR === idSector);
        this.loadingProgramasSectoriales = false;
        console.log(this.listaProgramasSectoriales);
      }
    )
  }

  onIdProgramaSectChange(newIdProgramaSect: number | null) {
    if(newIdProgramaSect !== this.idProgramaSect){
      this.mostrarDetalles = true;
      this.idProgramaSect = newIdProgramaSect;
    }

    console.log('Nuevo idProgramaSect:', this.idProgramaSect);
  }

  toggleBarra() {
    this.barraVisible = !this.barraVisible;
  }


  generarUrlImagen() {
    const baseUrl = this.servicio.getInfoImg('');
    this.imdDescargaDatos= `${baseUrl}Icons-new%20DB/NUBE.jpg`;
  }
}
