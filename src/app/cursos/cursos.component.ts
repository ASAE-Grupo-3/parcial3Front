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
        mensaje += "<b>Id Curso: </b>" + result.idCurso + " &nbsp;&nbsp;";
        mensaje += "<b>Nombre Curso: </b>" + result.nombre + " &nbsp;&nbsp;";
        mensaje += "<b>Periodo: </b>" + result.periodo + " <br>";
        mensaje += "<br>***Información de la Asignatura***<br>";
        mensaje += "<b>Id Asignatura: </b>" + result.objAsignatura.idAsignatura + "&nbsp;&nbsp;";
        mensaje += "<b>Asignatura: </b>" + result.objAsignatura.nombre + "&nbsp;&nbsp;";
        if(result.objAsignatura.docentes.length>0){
          mensaje += "<br><br>***Información de los docentes***<br>";
          for (const docente of curso.objAsignatura.docentes) {
            mensaje += "<b>Id: </b>" + docente.idPersona + " &nbsp;&nbsp;";
            mensaje += "<b>Nombres: </b>" + docente.nombres + " &nbsp;&nbsp;";
            mensaje += "<b>Apellidos: </b>" + docente.apellidos + " &nbsp;&nbsp;";
            mensaje += "<b>Tipo Identificación: </b>" + docente.tipoIdentificacion + " &nbsp;&nbsp;";
            mensaje += "<b>No. Identificación: </b>" + docente.noIdentificacion + " &nbsp;&nbsp;";
            mensaje += "<b>Universidad: </b>" + docente.universidad + " &nbsp;&nbsp;";
            mensaje += "<b>Tipo Docente: </b>" + docente.tipoDocente + " &nbsp;&nbsp;";
            mensaje += "<b>Salario: </b>" + docente.salario + " &nbsp;&nbsp;<br><br>";
          }
        }
        
        

        swal.fire({title:'Resultado',html:mensaje,width:1200});
        /*
        swal.fire({
          title: '<strong>HTML <u>example</u></strong>',
          icon: 'info',
          width: 1000,
          html:
            `<table class="table table-bordered table-striped mt-2" *ngIf="cursos.length>0">
            <thead>
                <tr>
                    <th>id curso</th>
                    <th>nombre curso</th>
                    <th>periodo curso</th>
                    <th>id asignatura</th>
                    <th>nombre asignatura</th>
                </tr>
            </thead>
            <tbody>
                <td>${result.idCurso}</td>
                <td>{{curso.nombre}}</td>
                <td>{{curso.periodo}}</td>
                <td>{{curso.objAsignatura.idAsignatura}}</td>
                <td>{{curso.objAsignatura.nombre}}</td>
                <tr *ngFor="let curso of ${this.cursos}">
                    <td>{{curso.idCurso}}</td>
                    <td>{{curso.nombre}}</td>
                    <td>{{curso.periodo}}</td>
                    <td>{{curso.objAsignatura.idAsignatura}}</td>
                    <td>{{curso.objAsignatura.nombre}}</td>
                </tr>
            </tbody>
        </table>`
        });
        */
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
