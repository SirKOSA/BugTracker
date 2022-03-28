export enum CATEGORY {
    NA = "N/A",
    UI = "UI",
    BackEnd = "Backe end",
    UserAuth = "User Authentication",
    Server = "Server",
}

// optional: Record type annotation guaranties that 
// all the values from the enum are presented in the mapping
export const Categories2LabelMapping: Record<CATEGORY, string> = {
    [CATEGORY.NA]: "N/A",
    [CATEGORY.UI]: "UI",
    [CATEGORY.BackEnd]: "Backe end",
    [CATEGORY.UserAuth]: "User Authentication",
    [CATEGORY.Server]: "Server",
};
