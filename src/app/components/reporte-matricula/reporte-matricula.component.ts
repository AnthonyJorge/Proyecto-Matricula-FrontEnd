import { Component,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Alumnos } from 'src/app/models/alumnos';
import { Docentes } from 'src/app/models/docentes';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ModalAlumnoComponent } from '../modal-alumno/modal-alumno.component';
import { ModalDocenteComponent } from '../modal-docente/modal-docente.component';
import { MatTableDataSource } from '@angular/material/table';
import { Matricula_Has_Docente } from 'src/app/models/matriculaHasDocente';
import { Matricula_Has_Docente_PK } from 'src/app/models/matriculaHasDocentePK';
import { Matriculas } from 'src/app/models/matriculas';
import Swal from 'sweetalert2';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-reporte-matricula',
  templateUrl: './reporte-matricula.component.html',
  styleUrls: ['./reporte-matricula.component.css']
})
export class ReporteMatriculaComponent {

  objAlumno : Alumnos = {};
  objDocente : Docentes = {};

  
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idDocente","nombre","dni","curso","grado",'actions'];

  lstDocentes : Docentes [] = [];
 
  objUsuario: Usuario = {} ;

  constructor(private dialogService: MatDialog, 
              private matriculaService: MatriculaService,
              private tokenService: TokenService) {
  }

  
  ngOnInit(): void {}

  buscaAlumno(){
    
      const dialogRef = this.dialogService.open(ModalAlumnoComponent);
      dialogRef.afterClosed().subscribe(() => this.cargaAlumno());
    } 

    cargaAlumno(){
      var str = window.sessionStorage.getItem("Alumnos")|| '{}';
      this.objAlumno = JSON.parse(str);
  }

  buscaDocente(){
    
    const dialogRef = this.dialogService.open(ModalDocenteComponent);
    dialogRef.afterClosed().subscribe(() => this.cargaDocente());
   
  }

  cargaDocente(){
    var str = window.sessionStorage.getItem("Docentes")|| '{}';
    this.objDocente = JSON.parse(str);
  }



  agregarDocente(){
    let noExiste = true;
    this.lstDocentes.forEach( (item, index) => { 
          if (item.idDocente == this.objDocente.idDocente ){
                this.lstDocentes[index] = this.objDocente;
                noExiste = false;              
          }
     });

    if (noExiste){
          this.lstDocentes.push(this.objDocente);
    }

    this.dataSource = new MatTableDataSource<Docentes>(this.lstDocentes);
    this.dataSource.paginator = this.paginator;
  }

  eliminarDocente(objDocente: Docentes){
    this.lstDocentes.forEach( (item, index) => { 
        if (item.idDocente == objDocente.idDocente ){
              this.lstDocentes.splice(index);
        }
    });

    this.dataSource = new MatTableDataSource<Docentes>(this.lstDocentes);
    this.dataSource.paginator = this.paginator;
  }



  registrarMatricula() {
  
    const lstDetalles: Matricula_Has_Docente[] = [];
  
    this.lstDocentes.forEach((item) => {
      var objPK: Matricula_Has_Docente_PK = {
        idDocente: item.idDocente
      };
  
      var  objDetalle: Matricula_Has_Docente = {
        docente:item,
        matricula_has_docente_pk: objPK
      };
      lstDetalles.push(objDetalle);
    });
  
    let objMatriculas : Matriculas = {
      alumno:this.objAlumno,
      detallesMatricula: lstDetalles
    };
  

    this.matriculaService.agregarMatricula(objMatriculas).subscribe( x => {
      Swal.fire({title: "Mensaje",text: x.mensaje ,icon: "info" });
      this.objAlumno = {};
      this.objDocente = {};
      this.lstDocentes = [];
      this.dataSource = new MatTableDataSource<Docentes>(this.lstDocentes);
      this.dataSource.paginator = this.paginator;
      });
    
  }

  
  

}
