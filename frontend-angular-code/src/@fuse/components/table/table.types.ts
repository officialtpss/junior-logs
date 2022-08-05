export interface column {
    columnDef: string;
    header: string;
    sort: boolean;
    isDisplayed: boolean;
}

export interface userAction {
    type: string;
    icon?: string;
    hide: boolean;
}

