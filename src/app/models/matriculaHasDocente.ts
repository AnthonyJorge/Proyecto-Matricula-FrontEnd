import { Docentes } from "./docentes";
import { Matricula_Has_Docente_PK } from "./matriculaHasDocentePK";

export class Matricula_Has_Docente {
    docente?:Docentes;
    matricula_has_docente_pk? : Matricula_Has_Docente_PK;
}