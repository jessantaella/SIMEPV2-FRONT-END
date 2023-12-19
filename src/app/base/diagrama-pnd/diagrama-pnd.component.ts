import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { ServicesBaseService } from "../services/services-base.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-diagrama-pnd",
  templateUrl: "./diagrama-pnd.component.html",
  styleUrls: ["./diagrama-pnd.component.scss"],
})
export class DiagramaPndComponent {
  altura: any;
  anchura: any;
  pruebaColor = "#2AB90A";
  coloresPND = {
    fondoGral: "#4caf62",
    fondoTitulo: "#398249",
    fondoContenido: "#52548c",
  };
  coloresDesarrolloSocial = {
    fondoGral: "#8285e0",
    fondoTitulo: "#53558f",
    fondoContenido: "#52548c",
  };
  coloresRamo33 = {
    fondoGral: "#17b0ba",
    fondoTitulo: "#1c6173",
    fondoContenido: "#0f747a",
  };
  nivelSeleccionado = null;
  mostrarMascara: boolean = false;
  timeLeft: number = 5;
  interval: any;
  mostrarMovil: boolean = false;
  //nd:true,desarrollo:true,fondos:true
  ocultarSecciones = [false, false, false];

  mostrarPnd = false;
  mostrarFederales = false;
  mostrarRamo = false;

  @Input() mascaraActiva = false;

  tamanioSecciones = [
    { height: "60.26", heightOriginal: "234.26" },
    { height: "50.26", heightOriginal: "125" },
    { height: "40.26", heightOriginal: "125" },
  ];

  separadoDiagrama = [
    {
      pndOriginal: {
        fondo: "378.29",
        fondo1: "379.75",
        texto: "389.07",
        conector: "0",
        flecha: "",
      },
      pndNuevo: {
        fondo: "210",
        fondo1: "210",
        texto: "220",
        conector: "-170",
        flecha: "",
      },
    },
    {
      federalesOriginal: {
        fondo: "402",
        fondo1: "405",
        texto: "417.3",
        conector: "0",
        flecha: "0",
        contenido: "443.29",
        textoContenido: "0",
      },
      federalesNuevo: {
        fondo: "230",
        fondo1: "240",
        texto: "250",
        conector: "-120",
        flecha: "-165",
        contenido: "275",
        textoContenido: "-170",
      },
    },
    {
      fondoOrigina: {
        conector: "0",
      },
      fondosNuevo: {
        conector: "-55",
      },
      fondosNuevoOcultos: {
        conector: "-235",
      },
    },
  ];

  public innerWidth: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private base: ServicesBaseService
  ) {
    this.breakpointObserver
      .observe(["(max-width: 768px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.mostrarMovil = true;
        } else {
          this.mostrarMovil = false;
        }
      });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["mascaraActiva"].currentValue && !this.mostrarMascara) {
      this.mascara();
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.mostrarMascara = false;
        clearInterval(this.interval);
        this.timeLeft = 8;
      }
    }, 1000);
  }

  mascara() {
    this.mostrarMascara = true;
    this.timeLeft = 8;
    this.startTimer();
  }
  ocultarMascara() {
    this.mostrarMascara = false;
    this.timeLeft = 8;
    clearInterval(this.interval);
  }

  eventoPND() {
    window.location.href = environment.simepsViejo + "_SIMEPS/HomeSIPOL.aspx";
  }
  eventoAcciones() {
    window.location.href = environment.simepsViejo + "_SIMEPS/MosaicoSips.aspx";
  }
  eventoRamo() {
    window.location.href =
      environment.simepsViejo + "_SIMEPS/HomeRamo33.aspx?pCiclo=2023";
  }

  mostrarSeccion(opcion: number) {
    this.ocultarSecciones[opcion] = !this.ocultarSecciones[opcion];
  }

  mostrarEvent(tipo: number) {
    if (tipo === 1) {
      this.mostrarPnd = !this.mostrarPnd;
    } else if (tipo === 2) {
      this.mostrarFederales = !this.mostrarFederales;
    } else if (tipo === 3) {
      this.mostrarRamo = !this.mostrarRamo;
    }
    console.log(this.mostrarPnd);
  }

  obtenerTamanio(tipo: number) {
    let salida = "100";
    switch (tipo) {
      case 1:
        salida = this.mostrarPnd
          ? this.tamanioSecciones[0].heightOriginal
          : this.tamanioSecciones[0].height;
        break;
      case 2:
        salida = this.mostrarFederales
          ? this.tamanioSecciones[1].heightOriginal
          : this.tamanioSecciones[1].height;
        break;
      case 3:
        salida = this.mostrarRamo
          ? this.tamanioSecciones[2].heightOriginal
          : this.tamanioSecciones[2].height;
        break;
    }
    return salida;
  }

  obtenerPosicion(tipo: number) {
    let salida: any;
    switch (tipo) {
      case 1:
        salida = !this.mostrarPnd
          ? this.separadoDiagrama[0].pndNuevo
          : this.separadoDiagrama[0].pndOriginal;
        break;
      case 2:
        salida = !this.mostrarPnd
          ? this.separadoDiagrama[1].federalesNuevo
          : this.separadoDiagrama[1].federalesOriginal;
        break;
      case 3:
        if (!this.mostrarPnd && !this.mostrarFederales) {
          salida = this.separadoDiagrama[2].fondosNuevoOcultos;
        } else if (!this.mostrarPnd) {
          salida = this.separadoDiagrama[2].fondosNuevo;
        }
        break;
    }
    return salida;
  }

  sumarDiferencia(valor1: string, valor2: number) {
    return Number(valor1) + valor2;
  }
}
