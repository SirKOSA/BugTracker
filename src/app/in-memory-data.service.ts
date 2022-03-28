import { Injectable } from '@angular/core';
import { CATEGORY } from './CATEGORY.enum';
import { PRIORITY } from './PRIORITY.enum';
import { Project } from './Project';
import { STATUS } from './STATUS.enum';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Issue } from './Issue';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const projects = [
    {
        id: 1,
        title: "Project1",
        description: "This is angular's project description",
      },
      {
        id: 2,
        title: "Project2",
        description: "This is angular's second project description",
      },
      {
        id: 3,
        title: "Project3333",
        description: "This is angular's second project description",
      }
    ];

    const issues = [
    {
        id: 1,
        projectId: 1,
        title: "Button not visible",
        description: "Button on main page is not visible.",
        category: CATEGORY.UI,
        status: STATUS.Closed,
        priority: PRIORITY.Critical,
        createdOn: new Date(),
        createdBy: "Maciej Kosiński",
        comment: "Issue has been fixed",
        lastChange: new Date(2023, 1, 17),
        lastChangedBy: "Admin"         
      },
      {
        id: 2,
        projectId: 1,
        title: "Page is not loading",
        description: "Second page is not loading.",
        category: CATEGORY.Server,
        status: STATUS.Open,
        priority: PRIORITY.Blocker,
        createdOn: new Date(),
        createdBy: "Maciej Kosiński",
        lastChange: undefined,
        lastChangedBy: undefined,
    },
    {
        id: 3,
        projectId: 2,
        title: "No user data",
        description: "There is no user data when entering 'my profile'.",
        category: CATEGORY.BackEnd,
        status: STATUS.In_progress,
        priority: PRIORITY.Critical,
        createdOn: new Date(),
        createdBy: "Maciej Kosiński",
        lastChange: undefined,
        lastChangedBy: undefined,
    },
    {
        id: 4,
        projectId: 3,
        title: "No user data in profile",
        description: "There is no user data when entering 'my profile'.",
        category: CATEGORY.BackEnd,
        status: STATUS.In_progress,
        priority: PRIORITY.Critical,
        createdOn: new Date(),
        createdBy: "Maciej Kosiński",
        lastChange: undefined,
        lastChangedBy: undefined,          
    }     
  ];

  return {projects, issues};
  }

  genId< T extends Project | Issue >(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
  constructor() { }
}
