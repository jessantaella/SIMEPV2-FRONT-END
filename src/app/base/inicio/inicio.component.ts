import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from "@angular/core";
import { ViewportScroller, isPlatformBrowser } from "@angular/common";
import { DataDynamic } from "../services/dinamic-data.services";
import { getWindow } from "ssr-window";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

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

  @ViewChild("main")
  main!: ElementRef;
  alto = 100;

  constructor(
    private scroller: ViewportScroller,
    private servicio: DataDynamic,
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId:any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    if (this.isBrowser) {
      this.breakpointObserver
      .observe(["(max-width: 768px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.fontSizeTitulo = "14px";
          this.fontSizeTituloNormal = "12px";
        } else {
          this.fontSizeTitulo = "24px";
          this.fontSizeTituloNormal = "20px";
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
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

  consultarData() {
    this.servicio.getInformacion().subscribe((res) => {
      this.nombreSistema = res?.simeps?.sistema;
      this.redes = res.generales.redes;
    });
  }

  goTo(opcion: number) {
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
    if (this.isBrowser) {
      let pos = this.scroller.getScrollPosition();
    if (pos[1] < 320) {
      this.menuSeleccionado = 1;
      this.auxMascara = false;
    } else if (pos[1] < 940 && pos[1] > 321) {
      this.menuSeleccionado = 2;
      this.auxMascara = true;
    } else if (pos[1] > 870) {
      this.menuSeleccionado = 3;
      this.auxMascara = false;
    }
  }
    }
    
}
