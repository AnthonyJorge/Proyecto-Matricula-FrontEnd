import { Cursos } from "./cursos";
import { Sexo } from "./sexo";

export class Docentes {
    idDocente?: number;
    nombre?:String;
    apellidoMa?:String;
    apellidoPa?:String;
    curso?:Cursos;
    edad?:String;
    telefono?:String;
    dni?:String;
    correo?:String;
    sexo?:Sexo;
}
