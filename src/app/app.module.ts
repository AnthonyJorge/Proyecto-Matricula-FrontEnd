import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { CrudAlumnoComponent } from './components/crud-alumno/crud-alumno.component';
import { CrudCursosComponent } from './components/crud-cursos/crud-cursos.component';
import { CrudDocenteComponent } from './components/crud-docente/crud-docente.component';
import { CrudMatriculaComponent } from './components/crud-matricula/crud-matricula.component';
import { UpdateCursosComponent } from './components/update-cursos/update-cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { addCursos } from './components/add-cursos/add-cursos.component';
import { ProdInterceptorService } from './interceptors/prod-interceptor.service';
import { LoginComponent } from './auth/login.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent,
    IndexComponent,
    
    AppComponent,
    CrudAlumnoComponent,
    CrudCursosComponent,
    CrudDocenteComponent,
    CrudMatriculaComponent,
    addCursos,
    UpdateCursosComponent,
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule,
    AppMaterialModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
