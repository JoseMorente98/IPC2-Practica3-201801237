import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { path } from '../config.module';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private basePath:string = path.path;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }

  //HANDLE ERROR
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: `, error.error);
    }
    return throwError(
      'Algo malo sucedio, por favor intentarlo más tarde D:');
  };

  //GET ALL
  getAll() : Observable<any> {
    let url = `${this.basePath}mensaje`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET ALL
  getAllDelete() : Observable<any> {
    let url = `${this.basePath}mensaje/delete`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET ALL
  getAllTop5Envia() : Observable<any> {
    let url = `${this.basePath}mensaje/envia`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET ALL
  getAllTop5Recibe() : Observable<any> {
    let url = `${this.basePath}mensaje/recibe`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET ALL
  getAllConversacion() : Observable<any> {
    let url = `${this.basePath}mensaje/conversacion`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET ALL
  getChat() : Observable<any> {
    let url = `${this.basePath}mensaje/chat`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET SINGLE
  getAllReceiver(id:number) : Observable<any> {
    let url = `${this.basePath}mensaje/user/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET SINGLE
  getAllMessages(id:number, id2:number) : Observable<any> {
    let url = `${this.basePath}mensaje/${id}/${id2}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET SINGLE
  getSingle(id:number) : Observable<any> {
    let url = `${this.basePath}mensaje/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //CREATE
  public create(data:any) : Observable<any> {
    let url = `${this.basePath}mensaje`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //CREATE
  public update(data:any) : Observable<any> {
    let url = `${this.basePath}mensaje/${data.id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //DELETE
  public delete(id:number) : Observable<any> {
    let url = `${this.basePath}mensaje/${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //DELETE
  public deleteChat(id:number) : Observable<any> {
    let url = `${this.basePath}chat/${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    );
  }

}
