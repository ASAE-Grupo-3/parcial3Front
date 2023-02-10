import { estudianteService } from './estudiante.service';
import { estudiante } from './estudiante';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { telefono } from '../telefonos/telefono';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public estudiante: estudiante = new estudiante();
  public titulo: String = 'Crear estudiante';
  public errores: string[] = [];

  constructor(private estudianteService: estudianteService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar():void {
    this.activedRoute.params.subscribe(
      e=> {
        let id = e['id'];
        if(id){
          this.estudianteService.getestudiante(id).subscribe(estudiante => this.estudiante = estudiante)
        }
      }
    )

  }

  public editarestudiante()
  {
    this.estudianteService.edit(this.estudiante.idPersona,this.estudiante).subscribe(
      respose =>
      {
        this.router.navigate(['/estudiantes']),
        swal.fire('Estudiante Actualizado', `estudiante ${respose.nombres} fue actualizado!`, 'success');
     },
     (err: HttpErrorResponse )=> {
               const map = new Map(Object.entries(err.error));
               const vector= Array.from(map.values());
               this.errores =vector as string[];
               console.error('Código del error desde el backend: ' + err.status);                  
             }
    )

  }

  public crearestudiante()
  {
    this.estudiante.fechaIngreso = new Date();
    this.estudianteService.create(this.estudiante).subscribe(
      respose =>
      {
        this.router.navigate(['/estudiantes']),
        swal.fire('Nuevo estudiante', `estudiante ${respose.nombres} creado con éxito!`, 'success');
     },
     (err: HttpErrorResponse )=> {
               const map = new Map(Object.entries(err.error));
               const vector= Array.from(map.values());
               this.errores =vector as string[];
               console.error('Código del error desde el backend: ' + err.status);
             }

    )

  }

  nuevoTelefono(telefonos: telefono[]){
    const map = new Map(Object.entries(telefonos));
    const vector = Array.from(map.values());
    Object.assign(this.estudiante.telefonos,vector[0]);
  }
}
