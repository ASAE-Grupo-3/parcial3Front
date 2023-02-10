import { docenteService } from './docente.service';
import { docente } from './docente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './formD.component.html',
  styleUrls: ['./formD.component.css']
})
export class FormDComponent implements OnInit {

  public docente: docente = new docente;
  public titulo: String = 'Crear docente';
  public errores: string[] = [];

  constructor(private docenteService: docenteService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar():void{
    this.activedRoute.params.subscribe(
      e=> {
        let id = e['id'];
        if(id){
          this.docenteService.getdocente(id).subscribe(es => this.docente = es)
        }
      }
    )

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
