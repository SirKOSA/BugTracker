import { Component, OnInit } from '@angular/core';
import { Project } from '../Project';
import { Issue } from '../Issue';
import { CATEGORY } from '../CATEGORY.enum';
import { STATUS } from '../STATUS.enum';
import { PRIORITY } from '../PRIORITY.enum';
import { ProjectService } from '../project.service';
import { MessageService } from '../message.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private projectService: ProjectService, 
    private messageService: MessageService) { 

  }
  value = '';
  projects: Project[] = [];

  projects$!: Observable<Project[]>;
  private searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.getProjects();

    this.projects$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.projectService.searchProjects(term)),
    );
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects
    );
  }

  add(title: string, description: string): void {
    title = title.trim();
    description = description.trim();
    if (!title) { return; }
    this.projectService.addProject({ title, description } as Project)
      .subscribe(project => {
        this.projects.push(project);
      });
  }

  delete(project: Project): void {
    this.projects = this.projects.filter(p => p !== project);
    this.projectService.deleteProject(project.id).subscribe();
    this.value = '';
    this.getProjects();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
