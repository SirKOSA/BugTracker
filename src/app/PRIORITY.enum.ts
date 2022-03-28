export enum PRIORITY {
    Blocker = "Blocker",
    Trivial = "Trivial",
    Major = "Major",
    Critical = "Critical"
}

export const Priorities2LabelMapping: Record<PRIORITY, string> = {
    [PRIORITY.Blocker]: "Blocker",
    [PRIORITY.Trivial] : "Trivial",
    [PRIORITY.Major]: "Major",
    [PRIORITY.Critical]: "Critical",
};
