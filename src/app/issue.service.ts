import { Injectable } from '@angular/core';
import { Project } from './Project';
import { Issue } from './Issue';
import { catchError, Observable, of, partition, tap } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issuesUrl = '/api/issues';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private messageService: MessageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET issues from the server */
  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issuesUrl)
    .pipe(
      tap(
        _ => this.log('fetched issues')
      ),
      catchError(this.handleError<Issue[]>('getIssues', []))
      );
  }

  /** GET issue by id. Will 404 if id not found */
  getIssue(id: number): Observable<Issue> {
    const url = `${this.issuesUrl}/${id}`;
    return this.http.get<Issue>(url)
    .pipe(
      tap(
        _ =>this.log(`fetched issue id=${id}`),
      ),catchError(this.handleError<Issue>(`getIssue id=${id}`))
    );
  } 

  /**GET all issues with projectId */
  getProjectIssues(projectId: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.issuesUrl}?projectId=${projectId}`)
    .pipe(
      tap(
        _ => this.log(`fetched issues from project ${projectId}`)
      ),catchError(this.handleError<Issue[]>('getIssues', []))
    );
  }

  /** POST: add a new issue to the server */
  addIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.issuesUrl, issue, this.httpOptions).pipe(
    tap((newIssue: Issue) => this.log(`added issue w/ id=${newIssue.id}`)),
    catchError(this.handleError<Issue>('addIssue'))
    );
  }

  /** PUT: update the issue on the server */
  updateIssue(issue: Issue): Observable<any> {
    return this.http.put(this.issuesUrl, issue, this.httpOptions).pipe(
      tap(_ => this.log(`updated issue id=${issue.id}`)),
      catchError(this.handleError<any>('updateIssue'))
    );
  }

    /** DELETE: delete the project from the server */
    deleteIssue(id: number): Observable<Issue> {
      const url = `${this.issuesUrl}/${id}`;
      return this.http.delete<Issue>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted issue id=${id}`)),
        catchError(this.handleError<Issue>('deleteIssue'))
      );
    }

  private log(message: string) {
    this.messageService.add(`IssueService: ${message}`);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
  
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
  
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
}
