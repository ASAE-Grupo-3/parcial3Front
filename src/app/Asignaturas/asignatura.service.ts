import { Injectable } from '@angular/core';
import { asignaturas } from './asignatura';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable()
export class asignaturaService {
  private urlEndPoint: string = 'http://localhost:5000/api/asignaturas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getasignaturas(): Observable<asignaturas[]> {
    return this.http.get<asignaturas[]>(this.urlEndPoint);
  }

  getasignatura(id: number): Observable<asignaturas> {
    return this.http.get<asignaturas>(this.urlEndPoint + '/' + id);
  }

  create(asignatura: asignaturas): Observable<asignaturas> {
    return this.http
      .post<asignaturas>(this.urlEndPoint, asignatura, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.mensaje);
          swal.fire('Error al crear el asignatura', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  edit(id: number, asignatura: asignaturas): Observable<asignaturas> {
    console.log(this.urlEndPoint + id, asignatura);
    return this.http.put<asignaturas>(this.urlEndPoint + '/' + id, asignatura, {
      headers: this.httpHeaders,
    }).pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.log(e.error.mensaje);
        swal.fire('Error al crear el asignatura', e.error.mensaje, 'error');
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
