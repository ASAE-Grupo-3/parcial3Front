import { estudianteService } from './estudiante.service';
import { estudiante } from './estudiante';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public estudiante: estudiante = new estudiante;
  public titulo: String = 'Crear estudiante';
  public errores: string[] = [];

  constructor(private estudianteService: estudianteService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar():void{
    this.activedRoute.params.subscribe(
      e=> {
        let id = e['id'];
        if(id){
          this.estudianteService.getestudiante(id).subscribe(es => this.estudiante = es)
        }
      }
    )

  }

  public editarestudiante()
  {
    this.estudianteService.edit(this.estudiante.id,this.estudiante).subscribe(
      respose =>
      {
        this.router.navigate(['/estudiantes']),
        swal.fire('Estudiante Actualizado', `estudiante ${respose.name} fue actualizado!`, 'success');
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
    this.estudiante.createAt = new Date();
    this.estudianteService.create(this.estudiante).subscribe(
      respose =>
      {
        this.router.navigate(['/estudiantes']),
        swal.fire('Nuevo estudiante', `estudiante ${respose.name} creado con éxito!`, 'success');
     },
     (err: HttpErrorResponse )=> {
               const map = new Map(Object.entries(err.error));
               const vector= Array.from(map.values());
               this.errores =vector as string[];
               console.error('Código del error desde el backend: ' + err.status);                  
             }

    )

  }

}
