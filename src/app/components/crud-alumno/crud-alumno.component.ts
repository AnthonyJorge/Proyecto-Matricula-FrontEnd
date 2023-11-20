import { Component,OnInit,ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Alumnos } from 'src/app/models/alumnos';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import { addAlumnos } from '../add-alumnos/add-alumnos.component';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateAlumnosComponent } from '../update-alumnos/update-alumnos.component';

@Component({
  selector: 'app-crud-alumno',
  templateUrl: './crud-alumno.component.html',
  styleUrls: ['./crud-alumno.component.css']
})

export class CrudAlumnoComponent  implements OnInit {

  
  
  objUsuario: Usuario = {};
  dataSource : any;

  @ViewChild(MatPaginator, {static:true}) paginator!:MatPaginator; 
  displayedColumns = ["idAlumno","nombre","apellidos","edad","dni","sexo","fechaNacimiento","acciones"];

  constructor(private formBuilder:FormBuilder,
    private dialogServices:MatDialog,
    private alumnoService:AlumnosService,
    private tokenService: TokenService,
    private utilService:UtilService,
    ){
      this.objUsuario.idUsuario = tokenService.getUserId();
    }

  ngOnInit():void{
    this.listadoAlumnos();
  }

  listadoAlumnos(){
    this.alumnoService.listarAlumno().subscribe(datos => {
      this.dataSource = new MatTableDataSource<Alumnos>(datos);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminarAlumno(obj:Alumnos){
    Swal.fire({
      title: '¿Seguro que desea Eliminar?',
      text: "Los cambios no se van a revetir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText : 'Sí, eliminar alumno',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.alumnoService.eliminarAlumno(obj.idAlumno || 0).subscribe(
          x => {
            this.listadoAlumnos();
            Swal.fire('Mensaje', x.mensaje, 'info');
          }
        );
      }
    })
  }

  openAddAlumno(){
    const  dialogRef = this.dialogServices.open(addAlumnos);
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.listadoAlumnos();
      }
    });

}

  UpdateAlumno(obj:Alumnos){
    const dialogRef = this.dialogServices.open(UpdateAlumnosComponent,{data:obj});
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.listadoAlumnos(); 
          }
    });
  }




}
