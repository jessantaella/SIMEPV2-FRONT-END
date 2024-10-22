import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent {
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

  agregarQueryParam(idProgramaSect: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { idProgramaSect: idProgramaSect },
      queryParamsHandling: 'merge' // Esto mantiene los queryParams existentes
    });
  }

}
