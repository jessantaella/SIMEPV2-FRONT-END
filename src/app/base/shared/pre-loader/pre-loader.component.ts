import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pre-loader',
  templateUrl: './pre-loader.component.html',
  styleUrls: ['./pre-loader.component.scss']
})
export class PreLoaderComponent {
  @Input() type: number = 1;
  @Input() height: string = '20px';
  @Input() width: string = '120px';

}
