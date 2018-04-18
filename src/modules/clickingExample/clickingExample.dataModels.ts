export enum ClickCountTypes {
    homeButtonClick,
    homeButtonClickOutside
}

export interface ClickingData {
    [clickCountType: number]: number
}