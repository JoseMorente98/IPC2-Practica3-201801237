import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { path } from 'src/app/config.module';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private basePath:string = path.path;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  
  constructor(private http: HttpClient) { }

  //HANDLE ERROR
  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      console.error('Un error ha ocurrido:', error.error.message);
      console.log(error)
      
    } else {
      console.log(error)
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: `, error.error);
    }
    return throwError(error);
  };

  //AUTENTICACIÓN
  public auth(data:any) : Observable<any> {
    let url = `${this.basePath}auth`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  //GET ALL
  getAll() : Observable<any> {
    let url = `${this.basePath}usuario`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET SINGLE
  getSingle(id:number) : Observable<any> {
    let url = `${this.basePath}usuario/${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  //CREATE
  public create(data:any) : Observable<any> {
    let url = `${this.basePath}usuario`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //CREATE
  public update(data:any) : Observable<any> {
    let url = `${this.basePath}usuario/${data.id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //GET SINGLE
  delete(id:number) : Observable<any> {
    let url = `${this.basePath}usuario/${id}`;
    return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

}
