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
    //this.cursoService.getCurso()
  }
  idCurso!:number;
  consultar(){
    if (this.idCurso==undefined) {
      swal.fire('Información', `No se ingreso un id de curso a buscar.`, 'warning');
    }else{
      this.cursoService.getcurso(this.idCurso).subscribe((result)=>{
        console.log(result);
        var curso:Curso = result;
        var mensaje = "***Información del Curso***<br>";
        mensaje += "Id Curso: " + result.idCurso + "<br>";
        mensaje += "Nombre Curso: " + result.nombre + "";
        mensaje += "Periodo: " + result.periodo + "";
        mensaje += "Nombre Curso: " + result.nombre + "<br>";
        mensaje += "***Información de la Asignatura***<br>";
        mensaje += "Id Asignatura: " + result.objAsignatura.idAsignatura + "<br>";
        mensaje += "Nombre Curso: " + result.nombre + "<br>";


        swal.fire('Resultado',mensaje);
      },
      (error)=>{
          if (error.status==404) {
            swal.fire('Error', error.error.mensaje, 'error');
          }
      });
    }
    
    
    
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
