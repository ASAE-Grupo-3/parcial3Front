import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Asignatura } from 'src/app/Asignaturas/asignatura';
import { asignaturaService } from 'src/app/Asignaturas/asignatura.service';

@Component({
  selector: 'app-query-asignaturas',
  templateUrl: './query-asignaturas.component.html',
  styleUrls: ['./query-asignaturas.component.css']
})
export class QueryAsignaturasComponent {
  asignaturas: Asignatura[] = [];
  private router: Router;


  constructor(private objasignaturaService: asignaturaService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {

  
    
      
  }

  patron!:string;

  consultar(){
    if (this.patron!="") {
      this.objasignaturaService
      .getasignaturaConsulta3(this.patron)
      .subscribe((estudiantes) => (this.asignaturas = estudiantes));
    }
    
  }


}
