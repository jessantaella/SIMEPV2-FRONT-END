import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DataDynamic } from './base/services/dinamic-data.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SIMEPS';
  version = 'V-1.0.0'+ new Date(); ;
  tags:any;

  constructor(private meta: Meta,private servicio:DataDynamic){
    this.consultarTags();
    console.log(this.version)
   }

  consultarTags(){
    this.servicio.getInformacion().subscribe(
      res=>{
        this.tags = res.simeps?.metas;
        this.addTags();
      }
    )
   }

   addTags(){
    this.tags.forEach((tg: { name: any; content: any; }) => {
      this.meta.addTag({ name: tg.name , content: tg.content});
    });
   }
}
