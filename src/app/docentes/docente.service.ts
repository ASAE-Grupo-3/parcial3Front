import { Injectable } from '@angular/core';
import { docente } from './docente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable()
export class docenteService {
  private urlEndPoint: string = 'http://localhost:5000/api/docentes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getdocentes(): Observable<docente[]> {
    return this.http.get<docente[]>(this.urlEndPoint);
  }

  getdocente(id: number): Observable<docente> {
    return this.http.get<docente>(this.urlEndPoint + '/' + id);
  }

  create(docente: docente): Observable<docente> {
    return this.http
      .post<docente>(this.urlEndPoint, docente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.mensaje);
          swal.fire('Error al crear el docente', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  edit(id: number, docente: docente): Observable<docente> {
    return this.http.put<docente>(this.urlEndPoint + '/' + id, docente, {
      headers: this.httpHeaders,
    }).pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.log(e.error.mensaje);
        swal.fire('Error al crear el docente', e.error.mensaje, 'error');
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
