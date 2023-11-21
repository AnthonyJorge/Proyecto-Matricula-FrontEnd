import { Component,ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alumnos } from 'src/app/models/alumnos';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-modal-alumno',
  templateUrl: './modal-alumno.component.html',
  styleUrls: ['./modal-alumno.component.css']
})
export class ModalAlumnoComponent {

  //Filtro de Grila
  filtro: string ="";

  //Grilla
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns = ["idAlumno","nombre","apellido","dni",'actions'];
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [5,10];
  dataSource:any;

  constructor(public dialogRef:MatDialogRef<ModalAlumnoComponent>,
    private dialog: MatDialog, private AlumnoService: AlumnosService) {
    this.refreshTable();
  }

  seleccioneAlumno(objAlumno: Alumnos) {
    window.sessionStorage.setItem("Alumnos", JSON.stringify(objAlumno));
    this.dialog.closeAll();
  }
  onNoClick():void{
    this.dialogRef.close();
  }
  applyFilter() {
      this.AlumnoService.consultaFiltro(this.filtro, this.pageIndex, this.pageSize).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Alumnos>(x);
          this.dataSource.paginator = this.paginator; 
        }
      );
   }

   onPageChange(any : any){
      console.log(">>> any.length >> " + any.length);
      console.log(">>> any.pageIndex >> " + any.pageIndex);
      console.log(">>> any.pageSize >> " + any.pageSize);
      console.log(">>> any.previousPageIndex >> " + any.previousPageIndex);

      this.AlumnoService.consultaFiltro(this.filtro, any.pageIndex, any.pageSize).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Alumnos>(x);
          this.dataSource.paginator = this.paginator; 
        }
      );
   }

  private refreshTable() {
      this.AlumnoService.consultaFiltro("",this.pageIndex, this.pageSize).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Alumnos>(x);
          this.dataSource.paginator = this.paginator; 
        }
      );
  }
}
