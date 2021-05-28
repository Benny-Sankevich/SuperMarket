import { CategoryModel } from "../models/category.model";

//categories State
export class CategoriesState {
    public categories: CategoryModel[] = []
}
//categories Action Type
export enum CategoriesActionType {
    categoriesDownloaded = "categoriesDownloaded",
}
// categories Action
export interface CategoriesAction {
    type: CategoriesActionType;
    payload?: any;
}

export function categoriesDownloadedAction(categories: CategoryModel[]): CategoriesAction {
    return { type: CategoriesActionType.categoriesDownloaded, payload: categories };
}

export function categoriesReducer(currentState: CategoriesState = new CategoriesState(),
    action: CategoriesAction): CategoriesState {
    const newState = { ...currentState };

    switch (action.type) {
        case CategoriesActionType.categoriesDownloaded:
            newState.categories = action.payload;
            break;
    }

    return newState;
}