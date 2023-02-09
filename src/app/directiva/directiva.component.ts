import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  habilitar: boolean = true;
  listaCategorias : string[] = ['Ventas', 'Contabilidad', 'Transporte', 'Informática', 'Contabilidad', 'Construcción'];

  setHabilitar(): void{
    this.habilitar = (this.habilitar == true)? false: true;
    }

}
