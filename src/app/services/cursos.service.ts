import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Cursos } from '../models/cursos';


const baseUrl = AppSettings.API_ENDPOINT + '/crudCurso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http:HttpClient) { }

  consultarPorNombre(filtro:string):Observable<Cursos[]>{
    return this.http.get<Cursos[]>(baseUrl + '/listarCursoPorNombre/' + filtro);
  }

  listarCurso():Observable<Cursos[]>{
    return this.http.get<Cursos[]>(baseUrl)
  }

  agregarCurso(obj:Cursos):Observable<any>{
    return this.http.post(baseUrl ,obj);
  }

  actualizarCurso(obj:Cursos):Observable<any>{
    return this.http.put(baseUrl + '/actualizarCurso', obj );
  }

  eliminarCurso(idCurso:number):Observable<any>{
    return this.http.delete(baseUrl +  '/eliminarCurso/' + idCurso);
  }



}
