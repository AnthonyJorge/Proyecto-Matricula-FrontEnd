import { Opcion } from "./opcion";

export class JwtDTO {
    token?: string;
    type?: string;
    nombreUsuario?: string;
    nombre?:string;
    authorities?: string[];
    opciones?: Opcion[];
}
