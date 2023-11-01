import { Sexo } from "./sexo";

export class Alumnos {
    idAlumno?:number;   
    nombre?:String;
    apellidoMa?:String;
    apellidoPa?:String;
    edad?:string;
    dni?:string;
    fechaNacimiento?:String;
    sexo?: Sexo;
}
