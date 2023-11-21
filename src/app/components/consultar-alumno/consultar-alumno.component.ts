import { Component,OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alumnos } from 'src/app/models/alumnos';
import { Sexo } from 'src/app/models/sexo';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-consultar-alumno',
  templateUrl: './consultar-alumno.component.html',
  styleUrls: ['./consultar-alumno.component.css']
})
export class ConsultarAlumnoComponent implements OnInit  {

  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = [
    "idAlumno",
    "nombre",
    "apellidos",
    "edad",
    "dni",
    "sexo",
    "fechaNacimiento",
    "fecha"
  ];


  lstSexo: Sexo []=[];

  nombre: string = '';
  apellidoPa: string = '';
  dni:string = '';
  sexo: string = '-1';

  constructor(
    private consultarAlumno:AlumnosService,
    private utilService: UtilService,
    private reportService:ReporteService
  ) { }

  ngOnInit(): void {
    this.utilService
      .listaSexo()
      .subscribe((x) => (this.lstSexo = x));
    this.consultarAlumnos();
  }

  consultarAlumnos() {
    this.consultarAlumno
      .ConsultaAlumno(
        this.nombre,
        this.apellidoPa,
        this.dni,
        this.sexo,
      )
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource<Alumnos>(x);
        this.dataSource.paginator = this.paginator;
      });
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellidoPa = '';
    this.dni = '-1';
    this.sexo = '-1';

    this.consultarAlumnos();
  }

  OnImprimir(){
    const encabezado = ["ID","Nombre","Apellido","Dni","Edad","Sexo","Fecha Nacimiento","Fecha Registro"]
    this.consultarAlumno.ConsultaAlumno( this.nombre,
      this.apellidoPa,
      this.dni,
      this.sexo).subscribe(
      data => {
        const cuerpo = Object(data).map(
          (obj:any) =>{
            const datos = [
              obj.idAlumno,
              obj.nombre,
              obj.apellidoPa,
              obj.dni,
              obj.edad,
              obj.sexo!.nombre,
              obj.fechaNacimiento,
              obj.fechaRegistro
            ]
            return datos;
          }
      
        )
        this.reportService.imprimir(encabezado,cuerpo,"Listado de Alumno",true);
        }
        )
  }

}
