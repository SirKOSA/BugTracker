import { Component, Input, OnInit } from '@angular/core';
import { CATEGORY, Categories2LabelMapping } from '../CATEGORY.enum';
import { Issue } from '../Issue';
import { PRIORITY, Priorities2LabelMapping } from '../PRIORITY.enum';
import { STATUS, Statuses2LabelMapping } from '../STATUS.enum';
import { IssueService } from '../issue.service';
import { MessageService } from '../message.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.sass']
})
export class IssueDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private issueService: IssueService,
    private messageService: MessageService) {  
  }

  issue?: Issue;

  //@Input() updateIssue = this.issue;

  public Statuses2LabelMapping = Statuses2LabelMapping;

  public statuses = Object.values(STATUS);

  public Categories2LabelMapping = Categories2LabelMapping;

  public categories = Object.values(CATEGORY);

  public Priorities2LabelMapping = Priorities2LabelMapping;

  public priorities = Object.values(PRIORITY);

  //issue: Issue;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.issueService.getIssue(id).subscribe(
      issue => this.issue = issue
    );
  }

  updateIssue(comment: string, status: STATUS, updatedBy: string):void {
    
    if(this.issue) {
      updatedBy = updatedBy.trim();
      if(!updatedBy) { return; }
      this.issue.comment = comment;
      this.issue.status = status;
      this.issue.lastChangedBy = updatedBy;
      this.issue.lastChange = new Date();
      this.issueService.updateIssue(this.issue);
    }
    
  }

  editIssue(title: string, description: string, category: CATEGORY,  priority: PRIORITY, lastChangedBy: string):void {
    if(this.issue) {
      title = title.trim();
      lastChangedBy = lastChangedBy.trim();
      if(!title || !lastChangedBy) { return; }
      this.issue.title = title;
      this.issue.description = description;
      this.issue.category = category;
      this.issue.priority = priority;
      this.issue.lastChangedBy = lastChangedBy;
      this.issue.lastChange = new Date();
      this.issueService.updateIssue(this.issue);
    }
  }

  

}
