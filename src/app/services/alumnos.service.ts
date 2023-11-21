import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumnos } from '../models/alumnos';


const  API_ENDPOINT='http://localhost:8090/url';
const  API_ENDPOINT_CONSULT='http://localhost:8090/url';
const baseUrl = API_ENDPOINT + '/crudAlumno';
const baseConsultUrl = API_ENDPOINT_CONSULT + '/consultaAlumno';
const baseUrlMatriculaAlumno = API_ENDPOINT + '/crudMatricula';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http:HttpClient) { }

  listarAlumno():Observable<Alumnos[]>{
    return this.http.get<Alumnos[]>(baseUrl)
  }

  agregarAlumno(obj:Alumnos):Observable<any>{
    return this.http.post(baseUrl , obj);
  }

  actualizarAlumno(obj:Alumnos):Observable<any>{
    return this.http.put(baseUrl + "/actualizarAlumno" , obj);
  }

  eliminarAlumno(idAlumno:number):Observable<any>{
    return this.http.delete(baseUrl + "/eliminarAlumno/" + idAlumno);
  }

  //Consulta
  ConsultaAlumno(nombre:string,apellidoPa:string,dni:string,idSexo:string):Observable<Alumnos[]>{
    const params = new HttpParams()
    .set("nombre",nombre)
    .set("apellidoPa",apellidoPa)
    .set("dni",dni)
    .set("idSexo",idSexo);

    return this.http.get<Alumnos[]>(baseConsultUrl + "/consultaAlumnoDinamica", {params} );
  }

  consultaFiltro(filtro:string, page: number, size: number):Observable<Alumnos[]>{
    if (filtro == ""){
      return  this.http.get<Alumnos[]>(baseUrlMatriculaAlumno +'/listaAlumno?page='+ page+'&size=' + size); 
    }else{
      return  this.http.get<Alumnos[]>(baseUrlMatriculaAlumno +'/listaAlumno/'+filtro+'?page='+ page+'&size=' + size); 
    }
}  

}
