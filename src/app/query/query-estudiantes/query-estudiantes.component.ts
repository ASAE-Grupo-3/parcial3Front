import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { estudiante } from 'src/app/estudiantes/estudiante';
import { estudianteService } from 'src/app/estudiantes/estudiante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-query-estudiantes',
  templateUrl: './query-estudiantes.component.html',
  styleUrls: ['./query-estudiantes.component.css']
})
export class QueryEstudiantesComponent {
  estudiantes: estudiante[] = [];
  private objestudianteService: estudianteService;
  private router: Router;


  constructor(objestudianteService: estudianteService, router: Router,private activedRoute:ActivatedRoute) {
    this.objestudianteService = objestudianteService;
    this.router = router;
  }

  title="";
  id=0;
  ngOnInit(): void {

    this.activedRoute.params.subscribe(
      e=> {
        let id = e['id'];
        if(id){
          this.id = id;
          if (id==1) {
            this.title = "Patron a buscar";
          }else if(id==2){
            this.title = "Identificacion";
          }
          
        }
      }
    )
    /*
    this.objestudianteService
      .getestudiantes()
      .subscribe((estudiantes) => (this.estudiantes = estudiantes));
      */
  }

  patron!:string;

  consultar(){
    
    
    if(this.patron!=""){
      if (this.id==1) {
        this.objestudianteService.getestudianteConsulta1(1,this.patron).subscribe((estudiantes) => {
          this.estudiantes = estudiantes;
          if (this.estudiantes.length<=0) {
            this.objestudianteService.getestudianteConsulta1(2,this.patron).subscribe((estudiantes) => {
              this.estudiantes = estudiantes;
              if (this.estudiantes.length<=0) {
                this.objestudianteService.getestudianteConsulta1(3,this.patron).subscribe((estudiantes) => {
                  this.estudiantes = estudiantes;
                });
              }
            });
          }
        });
      }else if(this.id==2){
        this.objestudianteService.getestudianteConsulta2(this.patron).subscribe((estudiantes) => {
          this.estudiantes = estudiantes;
        });
      }

      
    }
  }

  EliminarEstudiante(id: number) {
    swal
      .fire({
        title: '¿Estás seguro de eliminar el estudiante?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.objestudianteService.delete(id).subscribe((respose) => {
            this.objestudianteService
              .getestudiantes()
              .subscribe((estudiantes) => (this.estudiantes = estudiantes));
            swal.fire(
              'Estudiante Eliminado',
              `estudiante eliminado correctamente!`,
              'success'
            );
          });
        }
      });
  }
}
