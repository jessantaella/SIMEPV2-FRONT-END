import { HttpResponse } from "@angular/common/http";
import * as am4charts from '@amcharts/amcharts4/charts';
import { IntervaloEnGrafica } from "../Models/IntervaloEnGrafica";
import { CONFIGURACION_GRAFICA_LINEAL } from "../constants/configuracion-grafica-lineal";

export function extraerNombreDesdeHeader(response: HttpResponse<Blob>){

    // Extraer el nombre del archivo desde el header 'Content-Disposition'
    const contentDisposition = response.headers.get('content-disposition');  
    let fileName = 'Archivo desconocido'; // Valor por defecto   
    
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename=\"(.+)\"/);
      console.log({fileNameMatch});
      if (fileNameMatch) {
        fileName = fileNameMatch[1]; // Extraemos el nombre del archivo
      }
    }     

    // Retornar tanto el blob como el nombre del archivo
    return {
      fileName,
      fileBlob: response.body
    };
}


export function configurarGraficaLineal(valueAxis: am4charts.ValueAxis<am4charts.AxisRenderer>, id_indicador: number | undefined){
  var indicador : IntervaloEnGrafica | undefined = CONFIGURACION_GRAFICA_LINEAL.find(c=>c.id_indicador == id_indicador);
  
  if(indicador){
    // Ajustar la cuadrícula y el intervalo      
    valueAxis.renderer.grid.template.location = 0;
    valueAxis.min = indicador.minY;  // Valor mínimo
    valueAxis.max = indicador.maxY;  // Valor máximo
    valueAxis.strictMinMax = true; // Respetar los valores mínimo y máximo definidos
    valueAxis.renderer.minGridDistance = indicador.minGridDistance;
    // Formatear las etiquetas del eje Y para que tengan 3 decimale
    let decimals = indicador.decimals;
    if(decimals && decimals != 0){
      valueAxis.renderer.labels.template.adapter.add("text", function(text) {
        return parseFloat(text!).toFixed(decimals);  // Forzar a 3 decimales
      });
    }
    
  }   
}
