import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrudCursosComponent } from './components/crud-cursos/crud-cursos.component';
import { CrudDocenteComponent } from './components/crud-docente/crud-docente.component';
import { CrudAlumnoComponent } from './components/crud-alumno/crud-alumno.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { ConsultarCursoComponent } from './components/consultar-curso/consultar-curso.component';
import { ConsultarDocenteComponent } from './components/consultar-docente/consultar-docente.component';
import { ConsultarAlumnoComponent } from './components/consultar-alumno/consultar-alumno.component';
import { ReporteMatriculaComponent } from './components/reporte-matricula/reporte-matricula.component';

const routes: Routes = [
  {path:"verCrudCurso", component:CrudCursosComponent },
  {path:"verCrudDocente", component:CrudDocenteComponent},
  {path:"verCrudAlumno", component:CrudAlumnoComponent},
  {path:"verConsultaCurso", component:ConsultarCursoComponent},
  {path:"verConsultaDocente", component:ConsultarDocenteComponent},
  {path:"verConsultaAlumno", component:ConsultarAlumnoComponent},
  {path:"verReporteMatricula", component:ReporteMatriculaComponent},
  
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
