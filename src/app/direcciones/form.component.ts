import { Component, OnInit, Input } from '@angular/core';
import { direccion } from './direccion';

@Component({
  selector: 'app-form-direccion',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponentDirecciones implements OnInit {
  public errores: string[] = [];
  public direccion: direccion = new direccion();

  @Input() prmDireccion: direccion = new direccion();

  constructor() { }

  ngOnInit(): void {
    this.direccion = this.prmDireccion;
  }

  ngOnChanges () {
    this.direccion = this.prmDireccion;
  }
}
