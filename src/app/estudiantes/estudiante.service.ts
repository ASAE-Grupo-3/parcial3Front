import { Injectable } from '@angular/core';
import { estudiante } from './estudiante';
import { ESTUDIANTES } from './estudiante.json';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable()
export class estudianteService {
  private urlEndPoint: string = 'http://localhost:5000/api/Students';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getestudiantes(): Observable<estudiante[]> {
    return this.http.get<estudiante[]>(this.urlEndPoint);
  }

  getestudiante(id: number): Observable<estudiante> {
    return this.http.get<estudiante>(this.urlEndPoint + '/' + id);
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
    console.log(this.urlEndPoint + id, estudiante);
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
