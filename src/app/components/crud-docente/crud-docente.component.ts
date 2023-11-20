import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Docentes } from 'src/app/models/docentes';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { DocentesService } from 'src/app/services/docentes.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import { addDocente } from '../add-docentes/add-docentes.component';
import { UpdateDocentesComponent } from '../update-docentes/update-docentes.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crud-docente',
  templateUrl: './crud-docente.component.html',
  styleUrls: ['./crud-docente.component.css']
})
export class CrudDocenteComponent {

  
  //Para el filtro 
  filtro: string ="";
  
  objUsuario: Usuario = {};

  //filtro
  dataSource:any;

  @ViewChild(MatPaginator, {static:true}) paginator!:MatPaginator; 
  displayedColumns = ["idDocente","nombre","apellidos","curso","telefono","edad","dni","sexo","correo","acciones"];

  constructor(private formBuilder:FormBuilder,
    private dialogServices:MatDialog,
    private docenteService:DocentesService,
    private tokenService: TokenService,
    private utilService:UtilService,
    ){
      this.objUsuario.idUsuario = tokenService.getUserId();
    }


  ngOnInit():void{
    this.listarDocente();
  }


  eliminarDocente(obj:Docentes){
    Swal.fire({
      title: '¿Seguro que desea Eliminar?',
      text: "Los cambios no se van a revetir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText : 'Sí, eliminar Docente',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.docenteService.eliminarDocente(obj.idDocente || 0).subscribe(
          x => {
            this.listarDocente();
            Swal.fire('Mensaje', x.mensaje, 'info');
          }
        );
      }
    })
  }

  openAddDocente(){
    const  dialogRef = this.dialogServices.open(addDocente);
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.listarDocente();
      }
    });

}

  actualizarDocentes(obj:Docentes){
    this.docenteService.actualizarDocente(obj).subscribe();
  }

  UpdateDocente(obj:Docentes){

    const dialogRef = this.dialogServices.open(UpdateDocentesComponent,{data:obj});

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.listarDocente(); 
          }
    });
  }


  listarDocente(){
    this.docenteService.listarDocente().subscribe(
      x=>{
        this.dataSource = new MatTableDataSource<Docentes>(x);
        this.dataSource.paginator = this.paginator;
      }
    );

  }
}
