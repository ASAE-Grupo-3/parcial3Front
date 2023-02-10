import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { asignaturaService } from '../Asignaturas/asignatura.service';
import { Asignatura } from '../Asignaturas/asignatura';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent {
  public curso: Curso = new Curso();
  public titulo: String = 'Crear curso';
  public buttonCrear = true;
  public errores:string[] = [];
  asignaturas:Asignatura[]=[];
  constructor(private cursoService: CursoService, private router:Router,private route: ActivatedRoute,private asignaturaService:asignaturaService) {}

 

  public crearcurso()
  {
    this.cursoService.create(this.curso).subscribe(
      (respose:any) => 
      {
        this.router.navigate(['/cursos']);
        swal.fire('Nuevo curso', `curso ${respose.nombre} creado con éxito!`, 'success');
      },
      err =>{
        //console.log(err);
        
        this.errores = err.error.errors as string[]; 

      }
    )
  
  }
  selectedValue = 0;
  ngOnInit(): void {
    this.asignaturaService.getasignaturas().subscribe((asignaturas)=>{
      if (asignaturas.length<=0) {
        swal.fire('Error', `No hay asignaturas creadas para poderlas asociar con un curso!`, 'error');
      }else{
        this.asignaturas = asignaturas;
        this.selectedValue = asignaturas[0].idAsignatura;
        this.curso.objAsignatura.idAsignatura = this.asignaturas[0].idAsignatura;
      }
      
      
    });
  }
  
  selectChange($event:any) {
    this.curso.objAsignatura.idAsignatura = $event;
  }
}
