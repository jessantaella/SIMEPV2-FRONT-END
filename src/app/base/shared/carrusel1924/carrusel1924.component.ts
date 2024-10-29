import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrusel1924',
  templateUrl: './carrusel1924.component.html',
  styleUrls: ['./carrusel1924.component.scss']
})
export class Carrusel1924Component {
  @Input() listaProgramasSectoriales: any[] = [];
  @Input() loading: boolean = true;

  currentIndex: number = 0;
  imageWidth: number = 160;

  constructor(private route: ActivatedRoute, private router: Router) {}

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTransform();
    }
  }

  next() {
    if (this.currentIndex < this.listaProgramasSectoriales.length - this.visibleImageCount()) {
      this.currentIndex++;
      this.updateTransform();
    }
  }

  private updateTransform() {
    const ul = document.querySelector('.carousel ul') as HTMLElement;
    ul.style.transform = `translateX(-${this.currentIndex * this.imageWidth}px)`;
  }

  private visibleImageCount(): number {
    const carouselWidth = document.querySelector('.carousel')?.clientWidth || 0;
    return Math.floor(carouselWidth / (this.imageWidth + 10));
  }

  agregarQueryParam(idProSectorial: number) {
    console.log('Agregando idProSectorial:', idProSectorial);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { idProSectorial: idProSectorial },
      queryParamsHandling: 'merge' // Solo actualiza el query param sin cambiar de ruta
    }).then(() => {
      console.log('Navegación completada, URL actual:', this.router.url);
    });
  }



}
