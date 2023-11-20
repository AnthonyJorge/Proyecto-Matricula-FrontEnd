import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Alumnos } from 'src/app/models/alumnos';
import { Sexo } from 'src/app/models/sexo';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-alumnos',
  templateUrl: './add-alumnos.component.html',
  styleUrls: ['./add-alumnos.component.css']
})
export class addAlumnos {
//Grado
lstSexo:Sexo[] = []
//Usuario
objUsuario: Usuario = {};
//fechaNacimiento
fechaNacimiento = new Date();

  //Json para registrar o actualizar
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

    constructor(public dialogRef:MatDialogRef<addAlumnos>,
      private formBuilder:FormBuilder,
      private alumnosService:AlumnosService,
      private tokenService: TokenService, 
      private utilService:UtilService){
        this.utilService.listaSexo().subscribe(
          response => this.lstSexo = response
        )
        this.objUsuario.idUsuario = tokenService.getUserId();
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
          validaFechaNacimiento: ['',[Validators.required]],
          validaSexo: ['',[Validators.min(1)]]
        });

        insertarAlumno(){
        if(this.formsRegistra.valid){
          this.alumnosService.agregarAlumno(this.objAlumno).subscribe(
            x=> {
              Swal.fire('Mensaje',x.mensaje, 'info');
              this.objAlumno = {
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
            }
          );
        }

        
      }
}
