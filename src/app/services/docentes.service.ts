import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docentes } from '../models/docentes';


const baseUrl = AppSettings.API_ENDPOINT = "/crudDocente"

@Injectable({
  providedIn: 'root'
})

export class DocentesService {

  constructor( private http:HttpClient) { }

  consultarDocentePorNombre(filtro:string):Observable<Docentes[]>{
    return this.http.get<Docentes[]>(baseUrl + "/listarDocentePorNombre/" + filtro);
  }

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

}
