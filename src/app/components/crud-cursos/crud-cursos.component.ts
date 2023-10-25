import { Component,OnInit,ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cursos } from 'src/app/models/cursos';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { addCursos } from '../add-cursos/add-cursos.component';
import { UpdateCursosComponent } from '../update-cursos/update-cursos.component';
import { UtilService } from 'src/app/services/util.service';
import { TokenService } from 'src/app/security/token.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-crud-cursos',
  templateUrl: './crud-cursos.component.html',
  styleUrls: ['./crud-cursos.component.css']
})
export class CrudCursosComponent implements OnInit {

  //Para el filtro 
  filtro: string ="";
  //grado
  lstgrado:Cursos[] = [];

  objUsuario: Usuario = {};

  //filtro
  dataSource:any;

  @ViewChild(MatPaginator, {static:true}) paginator!:MatPaginator; 
  displayedColumns = ["idCurso","nombre","grado","fecha","acciones"];

  constructor(private formBuilder:FormBuilder,
    private dialogServices:MatDialog,
    private cursosService:CursosService,
    private tokenService: TokenService,
    private utilService:UtilService,
    ){
      this.objUsuario.idUsuario = tokenService.getUserId();
    }

 

  ngOnInit():void{}

  consultaCurso(){
    this.refresTable();
  }

  eliminarCurso(obj:Cursos){
    Swal.fire({
      title: '¿Seguro que desea Eliminar?',
      text: "Los cambios no se van a revetir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText : 'Sí, eliminar curso',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.cursosService.eliminarCurso(obj.idCurso || 0).subscribe(
          x => {
            this.refresTable();
            Swal.fire('Mensaje', x.mensaje, 'info');
          }
        );
      }
    })
  }

  openAddCursos(){
    const  dialogRef = this.dialogServices.open(addCursos);
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.refresTable();
      }
    });

}

  actualizarCurso(obj:Cursos){
    this.cursosService.actualizarCurso(obj).subscribe();
  }

  UpdateCurso(obj:Cursos){
   

    const dialogRef = this.dialogServices.open(UpdateCursosComponent,{data:obj});

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.refresTable(); 
          }
    });
  }


  private refresTable(){
    this.cursosService.consultarPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
      x=>{
        this.dataSource = new MatTableDataSource<Cursos>(x);
        this.dataSource.paginator = this.paginator;
      }
    );

  }

}
