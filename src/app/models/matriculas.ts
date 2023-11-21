import { Alumnos } from "./alumnos";
import { Matricula_Has_Docente } from "./matriculaHasDocente";

export class Matriculas {
    idMatricula?:number;
    alumno?:Alumnos;
    detallesMatricula?: Matricula_Has_Docente[];
}
