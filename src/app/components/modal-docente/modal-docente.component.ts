import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Docentes } from 'src/app/models/docentes';
import { CursosService } from 'src/app/services/cursos.service';
import { DocentesService } from 'src/app/services/docentes.service';

@Component({
  selector: 'app-modal-docente',
  templateUrl: './modal-docente.component.html',
  styleUrls: ['./modal-docente.component.css']
})
export class ModalDocenteComponent {
//Filtro de Grila
filtro: string ="";

//Grilla
@ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
displayedColumns = ["idDocente","nombre","dni","curso","grado",'actions'];
pageIndex = 0;
pageSize = 20;
pageSizeOptions = [5,10];
dataSource:any;

constructor(public dialogRef:MatDialogRef<ModalDocenteComponent>,
  private dialog: MatDialog, 
  private docenteService: DocentesService,
  private cursoService:CursosService) {
  this.refreshTable();
}

seleccioneDocente(objDocente: Docentes) {
  window.sessionStorage.setItem("Docentes", JSON.stringify(objDocente));
  this.dialog.closeAll();
}
onNoClick():void{
  this.dialogRef.close();
}
applyFilter() {
    this.docenteService.consultaFiltro(this.filtro, this.pageIndex, this.pageSize).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Docentes>(x);
        this.dataSource.paginator = this.paginator; 
      }
    );
 }

 onPageChange(any : any){

    this.docenteService.consultaFiltro(this.filtro, any.pageIndex, any.pageSize).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Docentes>(x);
        this.dataSource.paginator = this.paginator; 
      }
    );
 }

private refreshTable() {
    this.docenteService.consultaFiltro("",this.pageIndex, this.pageSize).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Docentes>(x);
        this.dataSource.paginator = this.paginator; 
      }
    );
}
}
