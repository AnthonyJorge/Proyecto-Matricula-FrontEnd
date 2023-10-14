import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { MantenimientoCurso } from './components/add-cursos/add-cursos.component';
import { MantenimientoDocente } from './components/add-docentes/add-docentes.component';
import { MantenimientoAlumno } from './components/add-alumnos/add-alumnos.component';
import { MantenimientoMatricula } from './components/add-matriculas/add-matriculas.component';

@NgModule({
  declarations: [
    AppComponent,
    MantenimientoCurso,
    MantenimientoDocente,
    MantenimientoAlumno,
    MantenimientoMatricula
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
