import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docentes } from '../models/docentes';


const  API_ENDPOINT='http://localhost:8090/url';
const baseUrl = API_ENDPOINT + '/crudDocente';
const baseConsultUrl = API_ENDPOINT + '/consultaDocente';

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

}
