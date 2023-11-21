import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docentes } from '../models/docentes';


const  API_ENDPOINT='http://localhost:8090/url';
const  API_ENDPOINT_CONSULT='http://localhost:8090/url';
const baseUrl = API_ENDPOINT + '/crudDocente';
const baseConsultUrl = API_ENDPOINT_CONSULT + '/consultaDocente';
const baseUrlMatriculaDocente = API_ENDPOINT_CONSULT + '/crudMatricula';

@Injectable({
  providedIn: 'root'
})

export class DocentesService {

  constructor( private http:HttpClient) { }

  listarDocente():Observable<Docentes[]>{
    return this.http.get<Docentes[]>(baseUrl)
  }

  agregarDocente(obj:Docentes):Observable<any>{
    return this.http.post(baseUrl, obj);
  }

  actualizarDocente(obj:Docentes):Observable<any>{
    return this.http.put(baseUrl +"/actualizarDocente" , obj );
  }

  eliminarDocente(idDocente:number):Observable<any>{
    return this.http.delete(baseUrl +"/eliminarDocente/" + idDocente);
  }

  //consultas

  consultaDocente(nombre:string,apellidoPa:string,dni:string,idSexo:string,idCurso:string):Observable<Docentes[]>{
    const params = new HttpParams()
    .set("nombre",nombre)
    .set("apellidoPa",apellidoPa)
    .set("dni",dni)
    .set("idSexo",idSexo)
    .set("idCurso",idCurso);

    return this.http.get<Docentes[]>(baseConsultUrl + "/consultaDocenteDinamica", {params} );
  }

  consultaFiltro(filtro:string, page: number, size: number):Observable<Docentes[]>{
    if (filtro == ""){
      return  this.http.get<Docentes[]>(baseUrlMatriculaDocente +'/listaDocente?page='+ page+'&size=' + size); 
    }else{
      return  this.http.get<Docentes[]>(baseUrlMatriculaDocente +'/listaDocente/'+filtro+'?page='+ page+'&size=' + size); 
    }
}  

}
