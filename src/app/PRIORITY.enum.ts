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

export const Priorities2NumersMapping: Record<PRIORITY, number> = {
    [PRIORITY.Blocker]: 1,
    [PRIORITY.Trivial] : 2,
    [PRIORITY.Major]: 3,
    [PRIORITY.Critical]: 4,
};
