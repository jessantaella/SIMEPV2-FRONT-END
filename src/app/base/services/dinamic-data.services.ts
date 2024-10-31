import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataDynamic {
  isBrowser = false;
  ruta = environment.servidor+"/conf/configuracion.json"; //LOCAL
  //servidor = "http://10.1.15.102:81/conf/configuracion.json"; //DEV
  //servidor = "https://qa.coneval.org.mx/conf/configuracion.json" //QA
  //servidor = "https://sistemas.coneval.org.mx/conf/configuracion.json" // PROD


constructor(private http:HttpClient,@Inject(PLATFORM_ID) private platformId:any){
}

getInformacion(): Observable<any> {
  const headers = new HttpHeaders()
  this.isBrowser = isPlatformBrowser(this.platformId);
  //if (this.isBrowser) {
    let url:string = window.location.hostname;
    if(url.includes('qa')){
      url = 'https://qa.coneval.org.mx/conf/configuracion.json'
    }else if(url.includes('sistemas')){
      url = 'https://sistemas.coneval.org.mx/conf/configuracion.json'
    }else{
      url = 'http://10.1.15.102:81/conf/configuracion.json'
    }
    return this.http.get<any>(url,{ headers: headers });
  //}
}

getImagen(imagen:string){
  if (this.isBrowser) {
    let url = window.location.hostname;
    if(url === 'localhost'){
      url = '10.1.15.102'
      return 'HTTP://' + url + ':81/conf/SIMEPS/img/' + imagen;
    }else if(url.includes('qa') || url.includes('sistemas')){
      return "https://"+url + '/conf/SIMEPS/img/'+imagen;

    }else{
      return 'HTTP://' + url + ':81/conf/SIMEPS/img/' + imagen;
    }
  } else {
    return '';
  }
}

getURLSimepsViejito(rute:string){
  if (this.isBrowser) {
    let url = window.location.hostname;
    if(url === 'localhost'){
      url = 'devnet.coneval.org.mx'
      return 'HTTP://' + url + ':84/' + rute;
    }else if(url.includes('qa') || url.includes('sistemas')){
      return "https://"+url + '/'+rute;

    }else{
      url = 'devnet.coneval.org.mx'
      return 'HTTP://' + url + ':84/' + rute;
    }
  } else {
    return '';
  }
}

isProduccion(){
  if (this.isBrowser) {
    let url = window.location.hostname;
    if(url.includes('sistemas')){
      return true;
    }else{
      return false;
    }
  } else {
    return false;
  }
}

getInfoImg(imagen: string): string {
  // Verificamos si estamos en el navegador
  if (this.isBrowser) {
    const hostname = window.location.hostname; // Obtenemos el hostname actual
    let baseUrl: string;

    // Definimos la URL base de acuerdo al hostname
    if (hostname.includes('qa')) {
      baseUrl = 'https://qa.coneval.org.mx/_SIMEPS/img/';
    } else if (hostname.includes('sistemas')) {
      baseUrl = 'https://sistemas.coneval.org.mx/_SIMEPS/img/';
    } else {
      // Ruta local para entorno de desarrollo
      return `assets/img/derechosSociales/${imagen}`; // Ruta local a la imagen
    }

    // Retornamos la URL completa de la imagen
    return `${baseUrl}${imagen}`;
  } else {
    return ''; // Retornamos vacío si no estamos en el navegador
  }
}



}

