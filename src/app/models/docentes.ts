import { Cursos } from "./cursos";
import { Sexo } from "./sexo";

export class Docentes {
    idDocente?: number;
    nombre?:String;
    apellidoMa?:String;
    apellidoPa?:String;
    curso?:Cursos;
    telefono?:number;
    dni?:number;
    correo?:String;
    sexo?:Sexo;
}
