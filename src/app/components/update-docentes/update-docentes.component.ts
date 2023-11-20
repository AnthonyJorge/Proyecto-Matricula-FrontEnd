import { Component,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-update-docentes',
  templateUrl: './update-docentes.component.html',
  styleUrls: ['./update-docentes.component.css']
})
export class UpdateDocentesComponent {
 //Sexo
 lstSexo: Sexo [] = [];
 //Curso
 lstCurso: Cursos [] = [];
  
 //Usuario
 objUsuario: Usuario= {};

 //fechaNacimiento
 fechaNacimiento = new Date();

  //Json para registrar o actualizar
  objDocentes:Docentes = {
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

  constructor(public dialogRef:MatDialogRef<UpdateDocentesComponent>,
    private formBuilder:FormBuilder,
    private docentesService:DocentesService,
    private tokenService: TokenService, 
    private cursoService: CursosService,
    private utilService:UtilService,
    @Inject(MAT_DIALOG_DATA) public data:any){
      utilService.listaSexo().subscribe(
        x => this.lstSexo = x
      )
      cursoService.listarCurso().subscribe(
        x => this.lstCurso = x
      )
      this.objUsuario.idUsuario =tokenService.getUserId();
      this.objDocentes = data;


    }

    onNoClick() : void {
      this.dialogRef.close();
    }

    formActualiza = this.formBuilder.group(
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

      actualizarDocentes(){
        if(this.formActualiza.valid){
          this.docentesService.actualizarDocente(this.objDocentes).subscribe(
            x=>{
              Swal.fire('Mensaje',x.mensaje,'info');
            }
          )
        }
      }
}
