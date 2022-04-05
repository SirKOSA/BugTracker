import { DataSource } from '@angular/cdk/collections';
import { Component, Input, AfterViewInit, DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CATEGORY } from '../CATEGORY.enum';
import { Issue } from '../Issue';
import { IssueService } from '../issue.service';
import { PRIORITY,Priorities2NumersMapping } from '../PRIORITY.enum';
import { STATUS } from '../STATUS.enum';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-topissues',
  templateUrl: './topissues.component.html',
  styleUrls: ['./topissues.component.sass']
})

export class TopissuesComponent implements AfterViewInit {
  private issues: Issue[] = [];
  @Input() set issuesSetter(value: Issue[]) {
    this.issues = value;  
    this.recalculatePriorty();
  }

  displayedColumns: string[] = ['id', 'category', 'title', 'status', 'createdOn', 'priority', 'edit'];

  topIssues: MatTableDataSource<Issue> = new MatTableDataSource<Issue>();
  topIssuesBuffer: Issue[] = [];
  enumPriorityValues: any = {};

  constructor(private issueService: IssueService, private route: ActivatedRoute) { }

  ngAfterViewInit(): void { 
    
  }


  recalculatePriorty(){
    this.topIssuesBuffer = [];
    if(this.issues.length > 0){
      
      this.issues.sort((x, y) => {
        if (x.status.toString() != STATUS.Closed.toString() &&
          (Priorities2NumersMapping[x.priority] * ( new Date().getTime() - (new Date(x.createdOn.toString()).getTime())))
          >
          ( Priorities2NumersMapping[y.priority] * ( new Date().getTime() - (new Date(x.createdOn.toString()).getTime())))
        ){
            return 1;
        }else {
          return -1;
        }  
      });     

      /*
      this.issues.sort((x, y) => 
        ( Priorities2NumersMapping[x.priority] * ( new Date().getTime() - (new Date(x.createdOn.toString()).getTime())))
        >
        ( Priorities2NumersMapping[y.priority] * ( new Date().getTime() - (new Date(x.createdOn.toString()).getTime()))) ? 1 : -1
      );
      */

      for(var i = 0; i < 5; i++) {
        if(this.issues[i]){
          this.topIssuesBuffer.push(this.issues[i] as Issue);  
        }
      }
      this.topIssues.data = this.topIssuesBuffer;
    }
  }

}
