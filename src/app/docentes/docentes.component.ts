import { docenteService } from './docente.service';
import { Component, OnInit } from '@angular/core';
import { docente } from './docente';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css'],
})
export class docentesComponent implements OnInit {
  docentes: docente[] = [];
  private objdocenteService: docenteService;
  private router: Router;

  constructor(objdocenteService: docenteService, router: Router) {
    this.objdocenteService = objdocenteService;
    this.router = router;
  }

  ngOnInit(): void {
    this.objdocenteService
      .getdocentes()
      .subscribe((docentes) => (this.docentes = docentes));
  }

  Eliminardocente(id: number) {
    swal
      .fire({
        title: '¿Estás seguro de eliminar el docente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.objdocenteService.delete(id).subscribe((respose) => {
            this.objdocenteService
              .getdocentes()
              .subscribe((docentes) => (this.docentes = docentes));
            swal.fire(
              'docente Eliminado',
              `docente eliminado correctamente!`,
              'success'
            );
          });
        }
      });
  }
}
