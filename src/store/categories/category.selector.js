import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

/*export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)*/

export const selectCategoriesMap = createSelector(
    [selectCategoryReducer], //as long as "selectCategoryReducer" doesn't change, don't run again
    (categories) => {
        return categories.categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        },{});
    }
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)