import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grado } from '../models/grado';
import { Sexo } from '../models/sexo';


const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  listaGrados():Observable<Grado[]>{
    return this.http.get<Grado[]>(baseUrlUtil + "/listarGrado");
  }
  
  listaSexo():Observable<Sexo[]>{
    return this.http.get<Sexo[]>(baseUrlUtil + "/listarSexo");
  }
  
}
