import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Asignatura } from '../Asignaturas/asignatura';
import { asignaturaService } from '../Asignaturas/asignatura.service';
import { Curso } from './curso';
import { CursoService } from './curso.service';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit{
  cursos:Curso[]=[];
  
  constructor(private cursoService:CursoService,private asignaturaService:asignaturaService){
    this.cursoService.getCurso().subscribe(cursos => {
      this.cursos = cursos;
      if (cursos.length==0) {
        swal.fire('Información', `La lista de cursos esta vacia`, 'info');  
      }
    });
  }
  ngOnInit(): void {
    
  }
  /*
  eliminarEstudiante(id:any){
    swal.fire({
      title: 'Realmente desea eliminar al estudiante con id: '+id,
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      /*
      if (result.isConfirmed) {
        this.cursoService.delete(id).subscribe((result:any)=>{
          console.log(result);
          if (result==true) {
            this.cursos=this.cursos.filter(estudiante=>estudiante.identificacion!=id);
            swal.fire('Información', `El estudiante con identificación: ${id} fue eliminado correctamente`, 'success');      
          }
        });
        
      }
    })
  }
  */
}
