import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { IssuesComponent } from './issues/issues.component';
import { ProjectsComponent } from './projects/projects.component';


const routes: Routes = [
  {path: '', redirectTo: '/projects', pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent,},
  { path: 'projects/:id', component: IssuesComponent},
  { path: 'issues/:id', component: IssueDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
