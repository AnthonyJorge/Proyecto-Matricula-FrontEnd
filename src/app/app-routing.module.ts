import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoCurso } from './components/add-cursos/add-cursos.component';
import { MantenimientoDocente } from './components/add-docentes/add-docentes.component';
import { MantenimientoAlumno } from './components/add-alumnos/add-alumnos.component';
import { MantenimientoMatricula } from './components/add-matriculas/add-matriculas.component';


const routes: Routes = [
  {path:"crudCurso", component:MantenimientoCurso },
  {path:"crudDocente", component:MantenimientoDocente},
  {path:"crudAlumno", component:MantenimientoAlumno},
  {path:"crudMatricula", component:MantenimientoMatricula}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
