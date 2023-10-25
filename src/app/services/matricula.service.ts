import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matriculas } from '../models/matriculas';
import { Alumnos } from '../models/alumnos';

const baseUrl = AppSettings.API_ENDPOINT ="/crudMatricula"

@Injectable({
  providedIn: 'root'
})

export class MatriculaService {

  constructor(private http:HttpClient) { }

  consultarMatriculaPorId(filtro:number):Observable<Matriculas[]>{
    return this.http.get<Matriculas[]>(baseUrl + "/filtrarMatriculaPorId/" + filtro );
  };

  agregarMatricula(obj:Matriculas):Observable<any>{
    return this.http.post(baseUrl + "agregarMatricula" , obj);
  }

  eliminarMatricula(idMatricula:number):Observable<any>{
    return this.http.delete(baseUrl + "eliminarMatricula/ " + idMatricula);
  }
}
