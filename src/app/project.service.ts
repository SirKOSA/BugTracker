import { Injectable } from '@angular/core';
import { Project } from './Project';
import { catchError, map, Observable, of, tap } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Issue } from './Issue';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = '/api/projects';
  
  constructor(private http: HttpClient,
    private messageService: MessageService ) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
    .pipe(
      tap(
        _ => this.log('fetched projects')
      ),
      catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  /** GET project by id. Will 404 if id not found */
  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url)
    .pipe(
      tap(
        _ =>this.log(`fetched project id=${id}`)
      ),catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

    /** GET project issues.*/
    /*
    getProjectIssues(id: number): Observable<Issue[]> {
      const url = `${this.projectsUrl}/${id}`;
      return this.http.get<Project>(url)
      .pipe(
        map(x => x.issues!),
        catchError(this.handleError(`getProjectIssues`,[]))
      );
    }
  */

  /** POST: add a new project to the server */
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions).pipe(
      tap((newProject: Project) => this.log(`added project w/ id=${newProject.id}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }

  /** DELETE: delete the project from the server */
  deleteProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

  /*GET Projects whose name contains search term */
  searchProjects(term: string): Observable<Project[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Project[]>(`${this.projectsUrl}/?title=${term}`)
    .pipe(
      tap(
        x => x.length ? 
        this.log(`Found projects mathcing term "${term}"`) : 
        this.log(`No projects mathcing term "${term}"`),
        catchError(this.handleError<Project[]>('serachProjects', []))
      )
    );
  }

  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);
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
