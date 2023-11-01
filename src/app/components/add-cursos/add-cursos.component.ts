import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cursos } from 'src/app/models/cursos';
import { Grado } from 'src/app/models/grado';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { CursosService } from 'src/app/services/cursos.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-cursos',
  templateUrl: './add-cursos.component.html',
  styleUrls: ['./add-cursos.component.css'],
})
export class addCursos {

  //Grado
  lstgrado:Grado[] = [];
  //Usuario
  objUsuario: Usuario = {};

    //Json para registrar o actualizar
    objCurso:Cursos = {
      nombre:"",
      grado:{
        idGrado: -1
      }
    };

      constructor(public dialogRef:MatDialogRef<addCursos>,
        private formBuilder:FormBuilder,
        private cursosService:CursosService,
        private tokenService: TokenService,
        private utilService:UtilService){

          this.utilService.listaGrados().subscribe(
            response => this.lstgrado = response
          )

        }

        onNoClick():void{
          this.dialogRef.close();
        }

        formsRegistra = this.formBuilder.group(
          {
            validaNombre: ['',[Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
            validaGrado: ['',[Validators.min(1)]]
          });

          insertarCurso(){
          if(this.formsRegistra.valid){
            this.cursosService.agregarCurso(this.objCurso).subscribe(
              x=> {
                Swal.fire('Mensaje',x.mensaje, 'info');
                this.objCurso = {
                  idCurso:0,
                  nombre:"",
                  grado:{
                    idGrado: -1
                  }
                };
              }
            );
          }

          
        }

}
