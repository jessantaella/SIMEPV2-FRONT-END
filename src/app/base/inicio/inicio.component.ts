import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, HostListener } from "@angular/core";
import { DOCUMENT, ViewportScroller, isPlatformBrowser } from "@angular/common";
import { DataDynamic } from "../services/dinamic-data.services";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { WINDOW } from "../services/window.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"],
})
export class InicioComponent {
  nivelSeleccionado: any;
  menuSeleccionado = 1;
  redes: any;
  nombreSistema: any;
  coloresTitulos = ["#21409A", "#00A94F", "#21409A"];
  auxMascara = false;
  fontSizeTitulo = "24px";
  fontSizeTituloNormal = "20px";
  isBrowser = false;
  celular = false;
  @ViewChild("main")
  main!: ElementRef;
  alto = 100;

  flechaBtn ="";
  lineaCnvl = "";
  constructor(
    private scroller: ViewportScroller,
    private servicio: DataDynamic,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId:any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    if (this.isBrowser) {
      this.flechaBtn = environment.recursos+"Flecha-Boton.png";
      this.lineaCnvl = environment.recursos+"Linea-Coneval.png";
      this.breakpointObserver
      .observe(["(max-width: 768px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.fontSizeTitulo = "14px";
          this.fontSizeTituloNormal = "12px";
          this.celular = true;
        } else {
          this.fontSizeTitulo = "24px";
          this.fontSizeTituloNormal = "20px";
          this.celular = false;
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
    document.body.scrollTop = 0;
    let pos = this.scroller.getScrollPosition();
    if (pos[1] > 0) {
      this.scroller.scrollToPosition([0, 0]);
    }
  }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
    setInterval(() => {
      let aux = this.main?.nativeElement.offsetHeight;
      this.alto = aux + aux / 6;
    }, 10);
    }
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    if (this.isBrowser) {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.obtenerPosicion();
    }
  }


  consultarData() {
    if(this.isBrowser){
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = res?.simeps?.sistema;
        this.redes = res.generales.redes;
      });
    }
  }

  goTo(opcion:number) {
    if (this.isBrowser) {
      this.breakpointObserver.observe([
        "(min-width: 0px) and (max-width: 576px)", 
        "(min-width: 577px) and (max-width: 992px)", 
        "(min-width: 993px)" 
      ]).subscribe((state: BreakpointState) => {
        if (state.breakpoints["(min-width: 0px) and (max-width: 576px)"]) {
          this.movil(opcion);
        } else if (state.breakpoints["(min-width: 577px) and (max-width: 992px)"]) {
          this.tablet(opcion);
        } else if (state.breakpoints["(min-width: 993px)"]) {
          this.web(opcion);
        }
      });
    }
  }

  web(opcion:number){
    if (this.isBrowser) {
      this.menuSeleccionado = opcion;
      switch (opcion) {
        case 1:
          this.scroller.scrollToPosition([0, 0]);
          break;
        case 2:
          this.scroller.scrollToPosition([0, 320]);
          this.auxMascara = true;
          break;
        case 3:
          this.scroller.scrollToPosition([0, 870]);
          break;
      }
    }
  }

  movil(opcion:number){
    if (this.isBrowser) {
      this.menuSeleccionado = opcion;
      switch (opcion) {
        case 1:
          this.scroller.scrollToPosition([0, 0]);
          break;
        case 2:
          this.scroller.scrollToPosition([0, 840]);
          this.auxMascara = true;
          break;
        case 3:
          this.scroller.scrollToPosition([0, 1500]);
          break;
      }
    }
  }

  tablet(opcion:number){
    if (this.isBrowser) {
      this.menuSeleccionado = opcion;
      switch (opcion) {
        case 1:
          this.scroller.scrollToPosition([0, 0]);
          break;
        case 2:
          this.scroller.scrollToPosition([0, 320]);
          this.auxMascara = true;
          break;
        case 3:
          this.scroller.scrollToPosition([0, 870]);
          break;
      }
    }
  }

  regresaEstilosMenu(opcion: number) {
    if (opcion === this.menuSeleccionado) {
      return {
        color: this.coloresTitulos[opcion - 1],
        font: this.fontSizeTitulo,
      };
    } else {
      return { color: "black", font: this.fontSizeTituloNormal };
    }
  }

  obtenerPosicion() {
    let element1 = document.getElementById('seccion1')!.clientHeight;
    let element2 = document.getElementById('seccion2')!.clientHeight;

    let validaOpcion3 = 0;
    if(this.celular){
      validaOpcion3 = element1 + element2
    }else{
      validaOpcion3 = element2;
    }

    if (this.isBrowser) {
      let pos = this.scroller.getScrollPosition();
    if (pos[1] < element1) {
      this.menuSeleccionado = 1;
      this.auxMascara = false;
    } else if (pos[1] < validaOpcion3 && pos[1] >= element1) {
      this.menuSeleccionado = 2;
      this.auxMascara = true;
    } else if (pos[1] > validaOpcion3 ) {
      this.menuSeleccionado = 3;
      this.auxMascara = false;
    }
  }
    }
    
}
