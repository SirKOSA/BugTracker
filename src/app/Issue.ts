import { CATEGORY } from "./CATEGORY.enum";
import { PRIORITY } from "./PRIORITY.enum";
import { STATUS } from "./STATUS.enum";

export interface Issue {
    id: number;
    projectId: number;
    title: string;
    description: string;
    category: CATEGORY;
    status: STATUS;
    priority: PRIORITY;
    createdOn: Date;
    createdBy: String;
    comment?: string;
    lastChange?: Date;
    lastChangedBy?: String;

}
