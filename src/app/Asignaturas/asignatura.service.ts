import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Asignatura } from './asignatura';

@Injectable({
  providedIn: 'root'
})
export class asignaturaService {
  private urlEndPoint: string = 'http://localhost:5000/api/asignaturas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getasignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.urlEndPoint);
  }

  getasignatura(id: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(this.urlEndPoint + '/' + id);
  }

  create(asignatura: Asignatura): Observable<Asignatura> {
    return this.http
      .post<Asignatura>(this.urlEndPoint, asignatura, {
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

  edit(id: number, asignatura: Asignatura): Observable<Asignatura> {
    console.log(this.urlEndPoint + id, asignatura);
    return this.http.put<Asignatura>(this.urlEndPoint + '/' + id, asignatura, {
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
