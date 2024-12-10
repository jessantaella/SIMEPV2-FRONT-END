import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';
import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-fichas-monitoreo',
  templateUrl: './fichas-monitoreo.component.html',
  styleUrls: ['./fichas-monitoreo.component.scss']
})
export class FichasMonitoreoComponent implements OnInit,OnDestroy{

  redes: any;
  nombreSistema: any;
  @ViewChild('planeacion')
  planeacion!: ElementRef;
  alto=100;
  esTablet = false;
  isBrowser = false;
  posicionInicial = 0;
  faChevronRight=faChevronRight;
  faChevronLeft=faChevronLeft;
  intervalo: any;
  tiempo=5260;
  cicloSeleccionado = 0;
  indicadores: boolean[] = [];

  tamanioBloque: number = 4; // Número de imágenes por bloque
  bloques: number[] = []; // Arreglo para los indicadores
  bloqueActivo: number = 0;

  dragDirection: 'izquierda' | 'derecha' | null = null; // Dirección de arrastre
  dragging: boolean = false; // Indica si está arrastrando
  startX: number = 0; // Posición inicial del mouse
  currentTranslateX: number = 0; // Desplazamiento actual
  translateX: string = 'translateX(0%)'; // Transformación CSS aplicada
  @ViewChild('carousel', { static: false }) carousel!: ElementRef<HTMLDivElement>;


  currentIndex = 0;
  groupSize = 4; // Tamaño del grupo (4 imágenes por indicador)
  groupIndicators: any[] = []; // Array de grupos
  currentGroupIndex = 0; // Índice del grupo actual

  anios: {
    CICLO: number;
    ID_PROG_SECTORIAL: number;
    URL_PORTADA: string | null;
    URL_FICHA: string | null;
    COLOR_CICLO: string;
  }[] = [];

  fichas: {
    CICLO: number;
    ID_PROG_SECTORIAL: number;
    URL_PORTADA: string;
    URL_FICHA: string;
    COLOR_CICLO: string;
  }[] = [];

  arregloVisible : {
    CICLO: number;
    ID_PROG_SECTORIAL: number;
    URL_PORTADA: string;
    URL_FICHA: string;
    COLOR_CICLO: string;
  }[] = [];

  constructor(
    private ambitoService: AmbitosocialService,
    @Inject(PLATFORM_ID) private platformId: any,
    private servicio: DataDynamic
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.obtenerAnios();
    this.validarArreglosVisiblesIzquierda(0);
    this.scrollToTop();

  }


  ngOnInit(): void {
    this.iniciarIntervalo();
    this.actualizarIndicadores();
    this.consultarData();
    this.startAutoScroll();

  }

  ngOnDestroy(): void {
    this.limpiarIntervalo();
    this.stopAutoScroll();

  }


  iniciarIntervalo(): void {
    this.limpiarIntervalo(); // Asegurarse de que no hay otro intervalo en ejecución
    this.intervalo = setInterval(() => {
      this.siguiente();
    }, this.tiempo); // Cambia 5000 por el tiempo que necesites
  }

  limpiarIntervalo(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }


  obtenerAnios(){
    this.ambitoService.obtenerAniosFichas().subscribe(
      res=>{
        this.anios = res?.Data;
        this.cicloSeleccionado = 2016;
        this.obtenerFichas(this.cicloSeleccionado);
      }
    )
  }

  obtenerFichas(anio: number) {
    this.ambitoService.obtenerFichasxAnio(anio).subscribe(
      res => {
        console.log('Datos recibidos:', res?.Data);
        this.fichas = res?.Data || [];
        this.calcularBloques(); // Recalcula bloques después de obtener las fichas
        this.validarArreglosVisiblesIzquierda(this.posicionInicial);
      },
      error => {
        console.error('Error al obtener las fichas:', error);
      }
    );
  }

  posicionActual = 0;

  obtenerTransform(): string {
    return `translateX(-${this.posicionActual * 25}%)`;
  }

  siguiente() {
    this.posicionInicial = (this.posicionInicial + 1) % this.fichas.length;
    this.validarArreglosVisiblesIzquierda(this.posicionInicial);
    this.actualizarIndicadores();
}

anterior() {
  this.posicionInicial = (this.posicionInicial - 1 + this.fichas.length) % this.fichas.length;
  this.validarArreglosVisiblesDerecha(this.posicionInicial);
  this.actualizarIndicadores();
}

validarArreglosVisiblesIzquierda(posIni: number) {
  this.posicionInicial = posIni < 0 ? this.fichas.length - 1 : posIni;
  this.arregloVisible = [];
  for (let a = 0; a < 4; a++) {
    const index = (this.posicionInicial + a) % this.fichas.length;
    this.arregloVisible.push(this.fichas[index]);
  }
}

validarArreglosVisiblesDerecha(posIni: number) {
  this.posicionInicial = posIni >= this.fichas.length ? 0 : posIni;
  this.arregloVisible = [];
  for (let a = 0; a < 4; a++) {
    const index = (this.posicionInicial + a) % this.fichas.length;
    this.arregloVisible.push(this.fichas[index]);
  }
}



  seleccionaCiclo(ciclo:number){
    this.cicloSeleccionado = ciclo;
    this.fichas = [];
    this.obtenerFichas(ciclo);
  }



  actualizarIndicadores(): void {
    this.bloqueActivo = Math.floor(this.posicionInicial / this.tamanioBloque);
  }


  calcularBloques() {
    const totalImagenes = this.fichas.length;
    const numBloques = Math.ceil(totalImagenes / this.tamanioBloque);
    this.bloques = Array.from({ length: numBloques }, (_, i) => i);
  }


  irABloque(indice: number) {
    this.bloqueActivo = indice;
    this.posicionInicial = indice * this.tamanioBloque;
    this.validarArreglosVisiblesIzquierda(this.posicionInicial);
    this.actualizarIndicadores();
    this.iniciarIntervalo(); // Reinicia el intervalo automático
  }
  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = 'MÓDULO DE PLANEACIÓN NACIONAL';
        this.redes = res.generales.redes;
      });

    }
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  /*llowDrop(event: DragEvent) {
    event.preventDefault();
  }

  onDragStart(event: DragEvent, index: number) {
    this.dragging = true;
    this.startX = event.clientX; // Guarda la posición inicial del mouse
    const images = document.querySelectorAll('img[draggable="true"]');
    images.forEach((img) => {
      img.classList.add('dragging'); // Añadimos la clase "dragging" para aplicar el estilo
    });
    // Evitar la creación de una copia flotante de la imagen
    event.dataTransfer?.setData('text', '');  // Necesario para evitar la copia visual
  }

  onDragging(event: DragEvent) {
    if (!this.dragging) return;

    // Calcula el desplazamiento relativo al movimiento del mouse
    const deltaX = event.clientX - this.startX;
    const percentage = (deltaX / window.innerWidth) * 100;

    // Actualiza la posición de las imágenes
    this.translateX = `translateX(${this.currentTranslateX + percentage}%)`;
  }

  onDragEnd(event: DragEvent, index: number) {
    this.dragging = false;

    // Detecta la dirección del arrastre
    const deltaX = event.clientX - this.startX;
    if (deltaX > 50) {
      this.validarArreglosVisiblesIzquierda(this.posicionInicial - 1);
    } else if (deltaX < -50) {
      this.validarArreglosVisiblesDerecha(this.posicionInicial + 1);
    }

    // Restaura el estado del carrusel
    this.currentTranslateX = 0;
    this.translateX = `translateX(0%)`;
  }

  // Actualiza el estado de arrastre en todas las imágenes
  updateImagesDragStatus(isDragging: boolean) {
    const images = document.querySelectorAll('.carousel-item img');
    images.forEach(image => {
      if (isDragging) {
        image.classList.add('dragging');
      } else {
        image.classList.remove('dragging');
      }
    });
  }*/

//////////////////////////////

isDragging = false;
scrollLeft = 0;
autoScrollInterval: any;
interactionTimeout: any;
startDrag(event: MouseEvent): void {
  this.isDragging = true;
  this.startX = event.pageX - this.carousel.nativeElement.offsetLeft;
  this.scrollLeft = this.carousel.nativeElement.scrollLeft;
  this.stopAutoScroll(); // Detiene el desplazamiento automático (si lo tienes implementado)
}

drag(event: MouseEvent): void {
  if (!this.isDragging) return;

  const x = event.pageX - this.carousel.nativeElement.offsetLeft;
  const walk = (x - this.startX) * 0.8; // Ajustar velocidad del desplazamiento
  this.carousel.nativeElement.scrollLeft = this.scrollLeft - walk;
}

stopDrag(): void {
  if (!this.isDragging) return;

  this.isDragging = false;

  // Ajustar la posición del carrusel al ítem más cercano
  const itemWidth = this.carousel.nativeElement.children[0].clientWidth;
  const currentScroll = this.carousel.nativeElement.scrollLeft;
  const closestIndex = Math.round(currentScroll / itemWidth); // Índice más cercano

  this.currentIndex = closestIndex % this.fichas.length; // Asegurar índice cíclico
  this.updateCarouselPosition(); // Alinear al índice correcto
  this.updateIndicators();
  this.resetAutoScroll(); // Reinicia el desplazamiento automático
}




updateCarouselPosition(): void {
  const itemWidth = this.carousel.nativeElement.children[0].clientWidth;
  const targetPosition = this.currentIndex * itemWidth;

  this.carousel.nativeElement.scrollTo({
    left: targetPosition,
    behavior: 'smooth',
  });
}

updateIndicators(): void {
  // Actualiza los indicadores según el índice actual
  this.currentGroupIndex = Math.floor(this.currentIndex / 4);
}


startAutoScroll(): void {
  this.stopAutoScroll(); // Asegurarte de que no haya duplicados
  this.autoScrollInterval = setInterval(() => {
    if (!this.isDragging && !this.isAnimating) {
      this.moveRight();
    }
  }, 3000); // 3 segundos
}


stopAutoScroll(): void {
  if (this.autoScrollInterval) {
    clearInterval(this.autoScrollInterval);
    this.autoScrollInterval = null;
  }
}
resetAutoScroll(): void {
  clearTimeout(this.interactionTimeout);
  this.interactionTimeout = setTimeout(() => {
    this.startAutoScroll();
  }, 1000);
}


private isAnimating = false;
isInteracting = false; // Estado para controlar la interacción manual

loopCarousel(): void {
  const carousel = this.carousel.nativeElement;
  const items = Array.from(carousel.children) as HTMLElement[];
  const itemWidth = items[0]?.clientWidth || 0; // Maneja si no hay elementos inicialmente

  let isDragging = false;
  let startX: number = 0;
  let scrollStart: number = 0;
  const dragSpeed = 1.5;

  // Eventos para el drag
  const startDrag = (e: MouseEvent | TouchEvent) => {
    isDragging = true;
    startX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    scrollStart = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
    e.preventDefault();
  };

  const duringDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const distance = startX - currentX;
    carousel.scrollLeft = scrollStart + distance * dragSpeed;
  };

  const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.cursor = 'grab';

    const currentScroll = carousel.scrollLeft;

    // Calcular el índice más cercano
    const closestIndex = Math.round(currentScroll / itemWidth);

    // Ajustar el scroll para alinear perfectamente
    carousel.style.transition = 'scroll-left 0.3s ease-in-out';
    carousel.scrollLeft = closestIndex * itemWidth;

    // Remover la transición para evitar efectos no deseados
    setTimeout(() => {
      carousel.style.transition = 'none';
    }, 300);
  };

  // Asignar los eventos
  carousel.addEventListener('mousedown', startDrag);
  carousel.addEventListener('mousemove', duringDrag);
  carousel.addEventListener('mouseup', stopDrag);
  carousel.addEventListener('mouseleave', stopDrag);
  carousel.addEventListener('touchstart', startDrag);
  carousel.addEventListener('touchmove', duringDrag);
  carousel.addEventListener('touchend', stopDrag);

  // Configuración inicial del carrusel
  setTimeout(() => {
    if (!items.length || !itemWidth) return; // Manejar si no hay elementos
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    // Asegurarse de que el carrusel tenga un estado inicial correcto
    if (carousel.scrollLeft === 0) {
      const lastItem = items[items.length - 1];
      carousel.insertBefore(lastItem, items[0]);
      carousel.scrollLeft += itemWidth;
    } else if (carousel.scrollLeft >= maxScrollLeft - itemWidth / 2) {
      const firstItem = items[0];
      carousel.style.transition = 'none';
      carousel.appendChild(firstItem);
    }
  }, 0); // Asegura que el DOM esté listo antes de realizar cambios
}
moveRight(): void {
  if (this.isAnimating) return; // Bloquear si ya hay una animación en curso
  this.isAnimating = true;

  const carousel = this.carousel.nativeElement;
  const itemWidth = carousel.children[0].clientWidth;

  // Desplazar el carrusel
  carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });

  // Esperar a que termine la animación antes de reordenar
  setTimeout(() => {
    this.loopCarousel(); // Reubicar elementos después del desplazamiento
    this.currentIndex = (this.currentIndex + 1) % this.fichas.length; // Actualizar índice
    this.updateIndicators();
    this.isAnimating = false; // Desbloquear al completar la animación
  }, 600); // Tiempo suficiente para que termine el desplazamiento
}

moveLeft(): void {
  if (this.isAnimating) return; // Bloquear si ya hay una animación en curso
  this.isAnimating = true;

  const carousel = this.carousel.nativeElement;
  const itemWidth = carousel.children[0].clientWidth;

  // Desplazar el carrusel
  carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });

  // Esperar a que termine la animación antes de reordenar
  setTimeout(() => {
    this.loopCarousel(); // Reubicar elementos después del desplazamiento
    this.currentIndex = (this.currentIndex - 1 + this.fichas.length) % this.fichas.length; // Actualizar índice
    this.updateIndicators();
    this.isAnimating = false; // Desbloquear al completar la animación
  }, 600); // Tiempo suficiente para que termine el desplazamiento
}



goToSlide(index: number): void {
  const carousel = this.carousel.nativeElement;
  const itemWidth = carousel.children[0].clientWidth;

  // Calcular la diferencia entre el índice actual y el deseado
  const diff = index - this.currentIndex;

  carousel.scrollBy({ left: diff * itemWidth, behavior: 'smooth' });

  // Ajustar el índice actual y sincronizar el carrusel
  setTimeout(() => {
    this.currentIndex = index;
    this.updateIndicators();
  }, 550);
}

getIndicatorIndexes(): number[] {
  // Generamos un índice por cada bloque de 4 imágenes
  return Array.from({ length: Math.ceil(this.fichas.length / 4) }, (_, i) => i);
}
goToGroup(groupIndex: number): void {
  // Calcular la posición de la primera imagen del grupo
  const carousel = this.carousel.nativeElement;
  const itemWidth = carousel.children[0].clientWidth;

  // Calcula el índice de la primera imagen del grupo seleccionado
  const targetIndex = groupIndex * 4;

  // Mueve el carrusel a la posición deseada
  carousel.scrollBy({ left: targetIndex * itemWidth, behavior: 'smooth' });

  // Actualiza el índice actual y los indicadores
  this.currentIndex = targetIndex;
  this.currentGroupIndex = groupIndex;
  this.updateIndicators();
}






}

