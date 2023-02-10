import { docente } from "../docentes/docente";

export class Asignatura {
	idAsignatura!: number;
	nombre!: string;
  	docentes!: docente [];
}
