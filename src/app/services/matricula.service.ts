import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matriculas } from '../models/matriculas';

const baseUrl = AppSettings.API_ENDPOINT ="/crudMatricula"

@Injectable({
  providedIn: 'root'
})

export class MatriculaService {

  constructor(private http:HttpClient) { }

  consultarMatriculaPorId(filtro:number):Observable<Matriculas[]>{
    return this.http.get<Matriculas[]>(baseUrl + "/filtrarMatriculaPorId/" + filtro );
  };

  listarMatricula():Observable<Matriculas[]>{
    return this.http.get<Matriculas[]>(baseUrl)
  }

  agregarMatricula(obj:Matriculas):Observable<any>{
    return this.http.post(baseUrl,obj);
  }

  actualizarMatricula(obj:Matriculas):Observable<any>{
    return this.http.put(baseUrl + '/actualizarMatricula',obj);

  }
  eliminarMatricula(idMatricula:number):Observable<any>{
    return this.http.delete(baseUrl + "eliminarMatricula/ " + idMatricula);
  }
}
