import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matriculas } from '../models/matriculas';


const  API_ENDPOINT='http://localhost:8090/url';
const baseUrl = API_ENDPOINT + '/crudMatricula';
const baseConsultUrl = API_ENDPOINT + '/consultaMatricula';

@Injectable({
  providedIn: 'root'
})

export class MatriculaService {

  constructor(private http:HttpClient) { }

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
  //consultar
  ConsultaCurso(idCurso:number):Observable<Matriculas[]>{
    const params = new HttpParams()
    .set("idCurso",idCurso);
    return this.http.get<Matriculas[]>(baseConsultUrl + "/consultaCurso", {params} );
  }

  ConsultarTipoPago(idTipoPago:number):Observable<Matriculas[]>{
    const params = new HttpParams()
    .set("idTipoPago",idTipoPago);
    return this.http.get<Matriculas[]>(baseConsultUrl + "/consultarTipoPago", {params} );
  }

  consultaTurno(idTurno:number):Observable<Matriculas[]>{
    const params = new HttpParams()
    .set("idTurno",idTurno);
    return this.http.get<Matriculas[]>(baseConsultUrl + "/consultaTurno", {params} );
  }

}

