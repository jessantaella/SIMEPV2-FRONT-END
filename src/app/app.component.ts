import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DataDynamic } from './base/services/dinamic-data.services';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ServerConfService } from './server-confing.service';
import { Router } from '@angular/router';

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

  constructor(private meta: Meta,private servicio:DataDynamic,@Inject(PLATFORM_ID) private platformId:any,  private url:ServerConfService, private serverConfigService: ServerConfService,  private router: Router,  @Inject(DOCUMENT) private document: Document){

    this.isBrowser = isPlatformBrowser(this.platformId);
    this.url.loadServerConfig();
    this.consultarTags();
    this.serverConfigService.loadServerConfig();

    if (this.isBrowser) {
      this.addResourcesBasedOnUrl();
    }
   }


  private addResourcesBasedOnUrl() {
    const currentUrl = this.router.url;
    /*const urlMappings = [
      { key: '10.1.15.102:81', url: 'http://10.1.15.102:81/conf/assets' },
      { key: 'sistemas', url: 'https://sistemas.coneval.org.mx/conf/assets' },
    ];
    
    let baseUrl = urlMappings.reduce(
      (acc, { key, url }) => (currentUrl.includes(key) ? url : acc),
      'https://qa.coneval.org.mx/conf/assets'
    );*/

    let baseUrl="https://sistemas.coneval.org.mx/conf/assets";
    
    let scripts = [
      `${baseUrl}/js/menu.js`,
      `${baseUrl}/js/aos.min.js`,
      `${baseUrl}/js/bs-init.js`,
      `${baseUrl}/js/ocultarRedes.js`
    ];

    // Hojas de estilo a agregar
    let styles = [
      `${baseUrl}/css/aos.min.css`,
      `${baseUrl}/css/header-nuevo.css`,
      `${baseUrl}/css/footer.css`
    ];

    // Agregar scripts al DOM
    scripts.forEach(src => {
      const scriptElement = this.document.createElement('script');
      scriptElement.src = src;
      scriptElement.async = true;
      this.document.head.appendChild(scriptElement);
    });

    // Agregar hojas de estilo al DOM
    styles.forEach(href => {
      const linkElement = this.document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = href;
      this.document.head.appendChild(linkElement);
    });
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
