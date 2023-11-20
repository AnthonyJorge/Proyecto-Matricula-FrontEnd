import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Cursos } from '../models/cursos';


const baseUrl = AppSettings.API_ENDPOINT + '/crudCurso';
const baseConsultUrl = AppSettings.API_ENDPOINT + '/consultaCurso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http:HttpClient) { }

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

  //Consultas
  listaConsultaCurso(nombre:string,idGrado:string):Observable<Cursos[]>{
    const params = new HttpParams()
    .set("nombre",nombre)
    .set("idGrado",idGrado);
    return  this.http.get<Cursos[]>(baseConsultUrl +"/consultaCursoPorParametros", {params}); 
  }

}
