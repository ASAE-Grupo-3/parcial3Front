import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private urlEndPoint: string = 'http://localhost:5000/api/cursos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  getCurso(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.urlEndPoint);
  }

  getcurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(this.urlEndPoint + '/' + id);
  }

  create(curso: Curso): Observable<Curso> {
    return this.http
      .post<Curso>(this.urlEndPoint, curso, {
        headers: this.httpHeaders,
      }) 
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.mensaje);
          swal.fire('Error al crear el curso', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  edit(id: number, curso: Curso): Observable<Curso> {
    console.log(this.urlEndPoint + id, curso);
    return this.http.put<Curso>(this.urlEndPoint + '/' + id, curso, {
      headers: this.httpHeaders,
    }).pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.log(e.error.mensaje);
        swal.fire('Error al crear el curso', e.error.mensaje, 'error');
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
