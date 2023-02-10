import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import { telefono } from './telefono';

@Component({
  selector: 'app-form-telefonos',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponentTelefonos implements OnInit {
  public errores: string[] = [];
  public telefonos: telefono[] = [];
  public form: FormGroup;

  @Input() prmTelefono: telefono[] = [];

  @Output() newTelefono = new EventEmitter<telefono[]>();

  ngOnInit(): void {
    this.telefonos = this.prmTelefono;
  }

  ngOnChanges () {
    this.telefonos = this.prmTelefono;
    this.telefonos.length ? this.telefonos.forEach(value => this.addTelefono(value)) : '';
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      telefonos: this.fb.array([]),
    });
  }

  addTelefono(telefono?: telefono) {
    const telefonos = this.form.controls['telefonos'] as FormArray;

    telefonos.push(this.fb.group({
      numero: telefono?.numero,
      tipo: telefono?.tipo,
      idTelefono: telefono?.idTelefono
    }));
  }

  hayNumeroDuplicado() {
      const telefonos = this.form.get("telefonos")?.value;
      const numeros = telefonos.map((telefono: telefono) => telefono.numero?.trim());
      const hasDuplicate = numeros.some((name: any, index: any) => numeros.indexOf(name, index + 1) != -1);

      if (hasDuplicate) {
        return { duplicate: true };
      }
      return null;
  }

  saveChanges() {
    this.newTelefono.emit(this.form.value);
  }
}
