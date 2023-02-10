import { Injectable } from '@angular/core';
import { estudiante } from './estudiante';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { direccion } from '../direcciones/direccion';

@Injectable()
export class estudianteService {
  private urlEndPoint: string = 'http://localhost:5000/api/estudiantes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getestudiantes(): Observable<estudiante[]> {
    return this.http.get<estudiante[]>(this.urlEndPoint);
  }

  getestudiante(id: number): Observable<estudiante> {
    return this.http.get<estudiante>(this.urlEndPoint + '/' + id).pipe(
      catchError(
        e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al consultar estudiante',e.error.mensaje,'error');
          return throwError(e);
        }
      )
    );
  }

  getestudianteConsulta1(n:number,patron:any): Observable<estudiante[]> {
    return this.http.get<estudiante[]>(this.urlEndPoint + '/consulta1/'+n+'?palabra=' + patron).pipe(
      catchError(
        e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al consultar estudiante',e.error.mensaje,'error');
          return throwError(e);
        }
      )
    );
  }

  getestudianteConsulta2(id:any): Observable<estudiante[]> {
    return this.http.get<estudiante[]>(this.urlEndPoint + '/consulta2/'+id).pipe(
      catchError(
        e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al consultar estudiante',e.error.mensaje,'error');
          return throwError(e);
        }
      )
    );
  }

  create(estudiante: estudiante): Observable<estudiante> {
    return this.http
      .post<estudiante>(this.urlEndPoint, estudiante, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.mensaje);
          swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  edit(id: number, estudiante: estudiante): Observable<estudiante> {
    return this.http.put<estudiante>(this.urlEndPoint + '/' + id, estudiante, {
      headers: this.httpHeaders,
    }).pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.log(e.error.mensaje);
        swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Object> {
    return this.http.delete(this.urlEndPoint + '/' + id, {
      headers: this.httpHeaders,
    });
  }
}
