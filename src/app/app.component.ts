import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DataDynamic } from './base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';
import { ServerConfService } from './server-confing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  title = 'SIMEPS';
  version = 'V-1.0.1'+ new Date();
  tags:any;
  ga:any;
  isBrowser = false;

  constructor(private meta: Meta,private servicio:DataDynamic,@Inject(PLATFORM_ID) private platformId:any,  private url:ServerConfService){
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.url.loadServerConfig();
    this.consultarTags();
   }

   cargaGA() {
      return new Promise((resolve, reject) => {
      let body =  document.body;
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = '';
      script.src = this.ga;
      script.onload =() => {
          resolve({loaded: true, status: 'Loaded'});
      };
      script.onerror = (error: any) => resolve({loaded: false, status: 'Loaded'});
      script.async = true;
      script.defer = true;
      body.appendChild(script);
  });
  }

  consultarTags(){
    if(this.isBrowser){
      this.servicio.getInformacion().subscribe(
        res=>{
          this.tags = res.simeps?.metas;
          this.ga = res.simeps?.ga?.url;
          if (this.isBrowser) {
            this.cargaGA();
          }
          this.addTags();
        })
    }
   }

   addTags(){
    if(this.isBrowser){
      this.tags.forEach((tg: { name: any; content: any; }) => {
        this.meta.addTag({ name: tg.name , content: tg.content});
      });
    }
   }
}
