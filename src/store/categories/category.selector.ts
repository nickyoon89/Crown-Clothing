import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";
import { Category, CategoryMap } from "./category.types";

const selectCategoryReducer = (state:CategoriesState):CategoriesState => state;

/*export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)*/

export const selectCategoriesMap = createSelector(
    [selectCategoryReducer], //as long as "selectCategoryReducer" doesn't change, don't run again
    (categories):CategoryMap => {
        return categories.categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        },{} as CategoryMap);
    }
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)