import { direccion } from '../direcciones/direccion';
import { telefono } from '../telefonos/telefono';

export class estudiante {
	idPersona!: number;
	noIdentificacion!: string;
	tipoIdentificacion!: string;
	nombres!: string;
	apellidos!: string;
	fechaIngreso!: Date;
	correo!: string;
	objDireccion!: direccion;
	telefonos!: telefono[];

  constructor(){
    this.objDireccion = new direccion();
    this.telefonos = [];
 }
}
