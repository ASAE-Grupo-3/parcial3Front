import { Asignatura } from "../Asignaturas/asignatura";

export class Curso {
    idCurso!:number;
    nombre!:string;
	periodo!:number;
    objAsignatura:Asignatura = new Asignatura();
}
