

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { estudiantesComponent } from './estudiantes/estudiantes.component';
import { estudianteService } from './estudiantes/estudiante.service';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './estudiantes/form.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
    {path: '', redirectTo: '/estudiantes', pathMatch: 'full'},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'estudiantes/form', component: FormComponent},
    {path: 'estudiantes', component: estudiantesComponent},
    {path: 'estudiantes/form/:id', component: FormComponent}

  ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    estudiantesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [estudianteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

