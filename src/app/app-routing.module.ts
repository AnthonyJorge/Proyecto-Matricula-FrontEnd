import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrudCursosComponent } from './components/crud-cursos/crud-cursos.component';
import { CrudDocenteComponent } from './components/crud-docente/crud-docente.component';
import { CrudAlumnoComponent } from './components/crud-alumno/crud-alumno.component';
import { CrudMatriculaComponent } from './components/crud-matricula/crud-matricula.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';

const routes: Routes = [
  {path:"verCrudCurso", component:CrudCursosComponent },
  {path:"verCrudDocente", component:CrudDocenteComponent},
  {path:"verCrudAlumno", component:CrudAlumnoComponent},
  {path:"verCrudMatricula", component:CrudMatriculaComponent},

  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
