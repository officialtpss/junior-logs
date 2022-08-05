import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: "root",
})

export class ApiServices {
  constructor(private http: HttpClient) { }
  /**
   *
   * @param url
   * @param body
   * @returns Observable<any>
   */
  post(url: string, body: any): Observable<any> {
    return this.http
      .post(url, body, httpOptions)
      .pipe(
        catchError(({ error }) => {
          return throwError(() => new Error(error?.error));
        })
      );
  }
  /***
   * get: To get data
   * @param url
   * @returns Observable<any>
   */

  get(url: string): Observable<any> {
    return this.http.get(url, httpOptions);
  }

  put(url: string, body: object): Observable<any> {
    return this.http
      .put(url, body, httpOptions)
      .pipe(
        catchError((err) => {
          console.log("Handling error locally and rethrowing it...", err);
          return throwError(err);
        })
      );
  }
  delete(url: string): Observable<any> {
    return this.http.delete(url, {
      headers: {
        "Content-Type": "application/json"
      },
    }).pipe(
      catchError(this.handleError('deleteUser')));
  }

  loginPost(url: string, body: object): Observable<any> {
    return this.http.post(url, body).pipe(
      catchError(({ error }) => {
        return throwError(() => new Error(error?.error));
      })
    );
  }

  signupPost(url: string, body: object): Observable<any> {
    return this.http.post(url, body).pipe(
      catchError(({ error }) => {
        return throwError(() => new Error(error?.error));
      })
    );
  }

  /**
   * getLocalStorage :Help to get LocalData
   * @param key
   * @returns
   */
  getLocalStorage(key: string) {
    return localStorage?.getItem(key);
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error); // log to console instead.
      if (error.error instanceof Event) {
        throw error.error;
      }
      throw new Error(`${operation} failed: ${error?.error}`);
    };

  }
}
