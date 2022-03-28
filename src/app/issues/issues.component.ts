import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CATEGORY, Categories2LabelMapping } from '../CATEGORY.enum';
import { Issue } from '../Issue';
import { PRIORITY, Priorities2LabelMapping } from '../PRIORITY.enum';
import { Project } from '../Project';
import { STATUS } from '../STATUS.enum';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { IssueService } from '../issue.service';

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

  @Input() issue?: Issue;
  issues?: Issue[];

  public Categories2LabelMapping = Categories2LabelMapping;

  public categories = Object.values(CATEGORY);

  public Priorities2LabelMapping = Priorities2LabelMapping;

  public priorities = Object.values(PRIORITY);

  

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
    private issueService: IssueService) {
  }

  ngAfterViewInit(): void {
    this.getProject();
    this.getIssues();
    this.dataSource = new MatTableDataSource(this.issues);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id).subscribe(
      project => this.project = project
    );
  }

  
  getIssues(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.issueService.getProjectIssues(id).subscribe(
      data => this.dataSource.data = data
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
      createdOn: new Date,
      createdBy: creator,
      comment: "",
      lastChange: new Date,
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

  refreshData(){
    this.getProject();
    this.getIssues();
  }

}
