import { docenteService } from './docente.service';
import { docente } from './docente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { asignaturas } from '../Asignaturas/asignatura';
import { asignaturaService } from '../Asignaturas/asignatura.service';


@Component({
  selector: 'app-form',
  templateUrl: './formD.component.html',
  styleUrls: ['./formD.component.css']
})
export class FormDComponent implements OnInit {

  public docente: docente = new docente;
  public titulo: String = 'Crear docente';
  public listaasignaturas: asignaturas[] = [];
  private objasignaturaService: asignaturaService;

  public errores: string[] = [];

  constructor(objasignaturaService: asignaturaService ,private docenteService: docenteService, private router:Router, private activedRoute:ActivatedRoute)
  {
    this.objasignaturaService = objasignaturaService;
    this.router = router;
  }

  ngOnInit(): void {
    this.objasignaturaService
    .getasignaturas()
    .subscribe((asignaturas) => (this.listaasignaturas = asignaturas));
  }

  public editardocente()
  {
    this.docenteService.edit(this.docente.idPersona,this.docente).subscribe(
      respose =>
      {
        this.router.navigate(['/docentes']),
        swal.fire('docente Actualizado', `docente ${respose.nombres} fue actualizado!`, 'success');
     },
     (err: HttpErrorResponse )=> {
               const map = new Map(Object.entries(err.error));
               const vector= Array.from(map.values());
               this.errores =vector as string[];
               console.error('Código del error desde el backend: ' + err.status);
             }
    )

  }

  public creardocente()
  {
    this.docenteService.create(this.docente).subscribe(
      respose =>
      {
        this.router.navigate(['/docentes']),
        swal.fire('Nuevo docente', `docente ${respose.nombres} creado con éxito!`, 'success');
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
