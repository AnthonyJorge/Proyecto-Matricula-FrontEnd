import { Component,Inject } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cursos } from 'src/app/models/cursos';
import { Grado } from 'src/app/models/grado';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { CursosService } from 'src/app/services/cursos.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-cursos',
  templateUrl: './update-cursos.component.html',
  styleUrls: ['./update-cursos.component.css']
})

export class UpdateCursosComponent {
  lstGrado: Grado [] = [];

  objUsuario: Usuario= {};

  objCurso:Cursos= {
    nombre: "",
    grado:  {
      idGrado: -1
    }
  }

  constructor(private cursoService:CursosService,
      private utilService:UtilService,
      private tokenService:TokenService,
      private dialogRef:MatDialogRef<UpdateCursosComponent>,
      private formBuilder:FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data:any){
        utilService.listaGrados().subscribe(
          x => this.lstGrado = x
        )

        this.objUsuario.idUsuario =tokenService.getUserId();
        this.objCurso = data;

      }

    onNoClick() : void {
      this.dialogRef.close();
    }

    formActualiza = this.formBuilder.group(
      {
        validaNombre: ['',[Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
        validaGrado: ['',[Validators.min(1)]]
      });

      actualizarCurso(){
        if(this.formActualiza.valid){
          this.cursoService.actualizarCurso(this.objCurso).subscribe(
            x=>{
              Swal.fire('Mensaje',x.mensaje,'info');
            }
          )
        }
      }


    
}
