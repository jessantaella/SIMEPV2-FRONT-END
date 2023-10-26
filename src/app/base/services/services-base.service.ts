import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesBaseService {

  nivelPNDseleccionado = new BehaviorSubject(0);
  mascara =  new BehaviorSubject(false);

  changeNivel(nivel:number){
    this.nivelPNDseleccionado.next(nivel);  
  }
  getNivel() : Observable<number>{
    return this.nivelPNDseleccionado.asObservable();
  }

  changeMascara(estado:boolean){
    this.mascara.next(estado);
  }

  getMascara():Observable<boolean>{
    return this.mascara.asObservable();
  }
}
