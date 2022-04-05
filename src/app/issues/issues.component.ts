import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CATEGORY, Categories2LabelMapping } from '../CATEGORY.enum';
import { Issue } from '../Issue';
import { PRIORITY, Priorities2LabelMapping } from '../PRIORITY.enum';
import { Project } from '../Project';
import { STATUS } from '../STATUS.enum';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { IssueService } from '../issue.service';
import { TopissuesComponent } from '../topissues/topissues.component';

import { Location } from '@angular/common';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.sass']
})
export class IssuesComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'category', 'title', 'status', 'createdOn', 'priority', 'options'];
  dataSource: MatTableDataSource<Issue> = new MatTableDataSource<Issue>();

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  project?: Project;

  issues: Issue[] = [];

  public Categories2LabelMapping = Categories2LabelMapping;

  public categories = Object.values(CATEGORY);

  public Priorities2LabelMapping = Priorities2LabelMapping;

  public priorities = Object.values(PRIORITY);

  dateCreatedOn: string = "";
  

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
    private issueService: IssueService) {
  }

  ngAfterViewInit(): void {
    this.getProject();
    this.getIssues();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id).subscribe(
      project => this.project = project
    );
  }

  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
  
  getIssues(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.issueService.getProjectIssues(id).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.issues = data;
      } 
    );
    
  }

  addIssue(projectId: number, title: string, description: string, category: CATEGORY, priority: PRIORITY, creator: string): void {
    title = title.trim();
    description = description.trim();
    creator = creator.trim();
    if (!title || !creator) { return; }
    const newIssue = {
      projectId: projectId,
      title: title,
      description: description,
      category: category,
      status: STATUS.Open,
      priority: priority,
      createdOn: new Date(this.dateCreatedOn),
      createdBy: creator,
      comment: "",
      lastChange: new Date(),
      lastChangedBy: creator
    };
    console.log(newIssue);
    
    if (!title) { return; }
    this.issueService.addIssue(newIssue as unknown as Issue)
      .subscribe(issue => {
        this.dataSource.data.push(issue as unknown as Issue);
      });
    this.refreshData();
  }

  deleteIssue(issue: Issue){
    this.issueService.deleteIssue(issue.id).subscribe();
    this.refreshData();
  }

  refreshData(){
    this.getProject();
    this.getIssues();
    this.issues = this.dataSource.data;
  }

}
