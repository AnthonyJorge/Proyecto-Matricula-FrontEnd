import { Alumnos } from "./alumnos";
import { Cursos } from "./cursos";
import { Docentes } from "./docentes";
import { Turno } from "./turno";

export class Matriculas {
    idMatricula?:number;
    curso?:Cursos;
    docente?:Docentes;
    alumno?:Alumnos;
    turno?:Turno;
    precio?:number;
    descuento?:number;
    precioTotal?:number;
    
}
