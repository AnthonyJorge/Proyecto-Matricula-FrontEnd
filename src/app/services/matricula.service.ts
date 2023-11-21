import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matriculas } from '../models/matriculas';


const  API_ENDPOINT='http://localhost:8090/url';
const baseUrl = API_ENDPOINT + '/crudMatricula';

@Injectable({
  providedIn: 'root'
})

export class MatriculaService {

  constructor(private http:HttpClient) { }

  listarMatricula():Observable<Matriculas[]>{
    return this.http.get<Matriculas[]>(baseUrl+"/listaBoletas")
  }
  

  agregarMatricula(obj:Matriculas):Observable<any>{
    return this.http.post(baseUrl+"/registrarMatricula",obj);
  }

}

