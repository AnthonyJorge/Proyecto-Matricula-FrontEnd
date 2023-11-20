import { Component,OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cursos } from 'src/app/models/cursos';
import { Grado } from 'src/app/models/grado';
import { CursosService } from 'src/app/services/cursos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-consultar-curso',
  templateUrl: './consultar-curso.component.html',
  styleUrls: ['./consultar-curso.component.css']
})
export class ConsultarCursoComponent {

  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = [
    "idCurso","nombre","grado"
  ];


  lstGrado: Grado []=[];

  nombre: string = '';
  grado: string = '-1';


  constructor(
    private consultarCurso:CursosService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.utilService
      .listaGrados()
      .subscribe((x) => (this.lstGrado = x));
    this.consultarCursos();
  }

  consultarCursos() {
    this.consultarCurso
      .listaConsultaCurso(
        this.nombre,
        this.grado,
      )
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource<Cursos>(x);
        this.dataSource.paginator = this.paginator;
      });
  }

  limpiarCampos() {
    this.nombre = '';
    this.grado = '-1';
    this.consultarCursos();
  }
}
