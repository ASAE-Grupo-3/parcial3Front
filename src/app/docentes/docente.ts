import { asignaturas } from "../Asignaturas/asignatura";

export class docente {
	idPersona!: number;
	noIdentificacion!: string;
	tipoIdentificacion!: string;
	nombres!: string;
	apellidos!: string;
	universidad!: string;
	tipoDocente!: string;
	salario!: number;
	asignaturas!: asignaturas [];
}
