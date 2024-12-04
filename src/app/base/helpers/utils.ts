import { HttpResponse } from "@angular/common/http";

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