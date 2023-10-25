import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumnos } from '../models/alumnos';


const baseUrl = AppSettings.API_ENDPOINT  = "/crudAlumno"
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private htpp:HttpClient) { }

  consultarAlumnoPorNombre(filtro:string):Observable<Alumnos[]>{
    return this.htpp.get<Alumnos[]>(baseUrl + "/listarAlumnoPorNombre/" +filtro);
  }

  agregarAlumno(obj:Alumnos):Observable<any>{
    return this.htpp.post(baseUrl + "/agregarAlumno" , obj);
  }

  actualizarAlumno(obj:Alumnos):Observable<any>{
    return this.htpp.put(baseUrl + "/actualizarAlumno" , obj);
  }

  eliminarAlumno(idAlumno:number):Observable<any>{
    return this.htpp.delete(baseUrl + "/eliminarAlumno/" + idAlumno);
  }

}
