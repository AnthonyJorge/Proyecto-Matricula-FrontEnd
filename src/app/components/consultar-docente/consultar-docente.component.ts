import { Component ,OnInit,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cursos } from 'src/app/models/cursos';
import { Docentes } from 'src/app/models/docentes';
import { Sexo } from 'src/app/models/sexo';
import { CursosService } from 'src/app/services/cursos.service';
import { DocentesService } from 'src/app/services/docentes.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-consultar-docente',
  templateUrl: './consultar-docente.component.html',
  styleUrls: ['./consultar-docente.component.css']
})
export class ConsultarDocenteComponent {
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  displayedColumns = [
    "idDocente","nombre","apellidos","curso","telefono","edad","dni","sexo","fecha"
  ];


  lstSexo: Sexo []=[];
  lstCurso: Cursos []=[];

  nombre: string = '';
  apellidoPa: string = '';
  dni:string = '';
  sexo: string = '-1';
  curso: string = '-1';


  constructor(
    private consultarDocente:DocentesService,
    private utilService: UtilService,
    private cursoService:CursosService,
    private reportService:ReporteService
  ) { }

  ngOnInit(): void {
    this.utilService
      .listaSexo()
      .subscribe((x) => (this.lstSexo = x));
      this.cursoService
      .listarCurso()
      .subscribe((x) => (this.lstCurso = x));
    this.consultaDocente();
  }

  consultaDocente() {
    this.consultarDocente.consultaDocente
      (
        this.nombre,
        this.apellidoPa,
        this.dni,
        this.sexo,
        this.curso
      )
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource<Docentes>(x);
        this.dataSource.paginator = this.paginator;
      });
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellidoPa = '';
    this.dni = '-1';
    this.sexo = '-1';
    this.curso = '-1';
    this.consultaDocente();
  }

  OnImprimir(){
    const encabezado = ["ID","Nombre","Apellidos","Curso","Telefono","Dni","Edad","Sexo","Fecha Registro"]
    this.consultarDocente.consultaDocente(  this.nombre,
      this.apellidoPa,
      this.dni,
      this.sexo,
      this.curso).subscribe(
      data => {
        const cuerpo = Object(data).map(
          (obj:any) =>{
            const datos = [
              obj.idDocente,
              obj.nombre,
              obj.apellidoPa + " " +obj.apellidoMa ,
              obj.curso!.nombre,
              obj.telefono,
              obj.dni,
              obj.edad,
              obj.sexo!.nombre,
              obj.fechaRegistro
            ]
            return datos;
          }
      
        )
        this.reportService.imprimir(encabezado,cuerpo,"Listado de Docente",true);
        }
        )
  }
}
