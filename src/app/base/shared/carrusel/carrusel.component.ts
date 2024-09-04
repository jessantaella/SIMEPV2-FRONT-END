import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent {
  images: string[] = [
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
  ];
  currentIndex: number = 0;
  imageWidth: number = 160;

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTransform();
    }
  }

  next() {
    if (this.currentIndex < this.images.length - this.visibleImageCount()) {
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

}
