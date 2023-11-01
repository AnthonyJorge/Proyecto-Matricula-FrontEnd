import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumnos } from 'src/app/models/alumnos';
import { Sexo } from 'src/app/models/sexo';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-alumnos',
  templateUrl: './update-alumnos.component.html',
  styleUrls: ['./update-alumnos.component.css']
})
export class UpdateAlumnosComponent {
  //Sexo
  lstSexo: Sexo [] = [];
  
  //Usuario
  objUsuario: Usuario= {};

  //fechaNacimiento
  fechaNacimiento = new Date();

  objAlumno:Alumnos = {
    nombre:"",
    apellidoMa:"",
    apellidoPa:"",
    edad:"",
    dni:"",
    fechaNacimiento:"",
    sexo:{
      idSexo: -1
    }
  };

  constructor(private alumnoService:AlumnosService,
      private utilService:UtilService,
      private tokenService:TokenService,
      private dialogRef:MatDialogRef<UpdateAlumnosComponent>,
      private formBuilder:FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data:any){
        utilService.listaSexo().subscribe(
          x => this.lstSexo = x
        )

        this.objUsuario.idUsuario =tokenService.getUserId();
        this.objAlumno = data;

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
        validaFechaNacimiento: ['',[Validators.required]],
        validaSexo: ['',[Validators.min(1)]]
      });

      actualizarAlumno(){
        if(this.formActualiza.valid){
          this.alumnoService.actualizarAlumno(this.objAlumno).subscribe(
            x=>{
              Swal.fire('Mensaje',x.mensaje,'info');
            }
          )
        }
      }

}
