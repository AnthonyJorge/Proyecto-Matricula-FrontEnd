import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cursos } from 'src/app/models/cursos';
import { Docentes } from 'src/app/models/docentes';
import { Sexo } from 'src/app/models/sexo';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { CursosService } from 'src/app/services/cursos.service';
import { DocentesService } from 'src/app/services/docentes.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-docentes',
  templateUrl: './add-docentes.component.html',
  styleUrls: ['./add-docentes.component.css']
})
export class addDocente {
//Sexo
lstSexo:Sexo[] = []
//Curso
lstCurso:Cursos[] = []
//Usuario
objUsuario: Usuario = {};

  //Json para registrar o actualizar
  objDocente:Docentes = {
    nombre:"",
    apellidoMa:"",
    apellidoPa:"",
    edad:"",
    telefono:"",
    correo:"",
    dni:"",
    curso:{
      idCurso: -1
    },
    sexo:{
      idSexo: -1
    }
  };

    constructor(public dialogRef:MatDialogRef<addDocente>,
      private formBuilder:FormBuilder,
      private docentesService:DocentesService,
      private tokenService: TokenService, 
      private utilService:UtilService,
      private cursoSrevice:CursosService){
        this.utilService.listaSexo().subscribe(
          response => this.lstSexo = response
        )
        this.cursoSrevice.listarCurso().subscribe(
          response => this.lstCurso = response
        )

      }

      onNoClick():void{
        this.dialogRef.close();
      }

      formsRegistra = this.formBuilder.group(
        {
          validaNombre: ['',[Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
          validaApellidoMa: ['',[Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
          validaApellidoPa: ['',[Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
          validaEdad: ['',[Validators.required,Validators.pattern('[0-9 ]{1,2}')]],
          validaDNI: ['',[Validators.required,Validators.pattern('[0-9 ]{8}')]],
          validaCorreo: ['',[Validators.required]],
          validatelefono: ['',[Validators.required,Validators.pattern('[0-9 ]{9}')]],
          validaSexo: ['',[Validators.min(1)]],
          validaCurso: ['',[Validators.min(1)]]
        });

        insertarDocente(){
        if(this.formsRegistra.valid){
          this.docentesService.agregarDocente(this.objDocente).subscribe(
            x=> {
              Swal.fire('Mensaje',x.mensaje, 'info');
              this.objDocente = {
              nombre:"",
              apellidoMa:"",
              apellidoPa:"",
              edad:"",
              telefono:"",
              correo:"",
              dni:"",
              curso:{
                idCurso: -1
              },
              sexo:{
                idSexo: -1
              }
              };
            }
          );
        }

        
      }
}
