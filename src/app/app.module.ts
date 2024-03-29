

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { estudiantesComponent } from './estudiantes/estudiantes.component';
import { estudianteService } from './estudiantes/estudiante.service';
import { docentesComponent } from './docentes/docentes.component';
import { docenteService } from './docentes/docente.service';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './estudiantes/form.component';
import { FormDComponent } from './docentes/formD.component';
import { FormsModule } from '@angular/forms';
import { CursosComponent } from './cursos/cursos.component';
import { FormCursoComponent } from './cursos/form-curso.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { FormComponentDirecciones } from './direcciones/form.component';
import { FormComponentTelefonos } from './telefonos/form.component';
import { asignaturaService } from './Asignaturas/asignatura.service';
import { QueryComponent } from './query/query.component';
import { QueryEstudiantesComponent } from './query/query-estudiantes/query-estudiantes.component';
import { QueryAsignaturasComponent } from './query/query-asignaturas/query-asignaturas.component';

const routes: Routes = [
    {path: '', redirectTo: '/docentes', pathMatch: 'full'},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'estudiantes/form', component: FormComponent},
    {path: 'estudiantes', component: estudiantesComponent},
    {path: 'estudiantes/form/:id', component: FormComponent},
    {path: 'docentes/form', component: FormDComponent},
    {path: 'docentes', component: docentesComponent},
    {path: 'cursos', component: CursosComponent},
    {path: 'cursos/form', component: FormCursoComponent},
    {path: 'consultas', component: QueryComponent},
    {path: 'consultas/estudiantes/:id', component: QueryEstudiantesComponent},
    {path: 'consultas/asignaturas', component: QueryAsignaturasComponent},
  ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    estudiantesComponent,
    FormComponent,
    DireccionesComponent,
    TelefonosComponent,
    FormComponentDirecciones,
    FormComponentTelefonos,
    FormDComponent,
    CursosComponent,
    FormCursoComponent,
    docentesComponent,
    QueryComponent,
    QueryEstudiantesComponent,
    QueryAsignaturasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [estudianteService,docenteService,asignaturaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

