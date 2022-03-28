export enum STATUS {
    Open = "Open",
    In_progress = "In progress",
    Resolved = "Resolved",
    Closed = "Closed",
}

export const Statuses2LabelMapping: Record<STATUS, string> = {
    [STATUS.Open]: "Open",
    [STATUS.In_progress] : "In progress",
    [STATUS.Resolved]: "Resolved",
    [STATUS.Closed]: "Closed",
};