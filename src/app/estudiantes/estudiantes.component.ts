import { estudianteService } from './estudiante.service';
import { Component, OnInit } from '@angular/core';
import { estudiante } from './estudiante';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class estudiantesComponent implements OnInit {
  estudiantes: estudiante[] = [];
  private objestudianteService: estudianteService;
  private router: Router;

  constructor(objestudianteService: estudianteService, router: Router) {
    this.objestudianteService = objestudianteService;
    this.router = router;
  }

  ngOnInit(): void {
    this.objestudianteService
      .getestudiantes()
      .subscribe((estudiantes) => (this.estudiantes = estudiantes));
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
