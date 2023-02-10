

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

const routes: Routes = [
    {path: '', redirectTo: '/estudiantes', pathMatch: 'full'},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'estudiantes/form', component: FormComponent},
    {path: 'estudiantes', component: estudiantesComponent},
    {path: 'estudiantes/form/:id', component: FormComponent},
    {path: 'docentes/form', component: FormDComponent},
    {path: 'docentes', component: docentesComponent},
  ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    estudiantesComponent,
    FormComponent,
    docentesComponent,
    FormDComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [estudianteService,docenteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

