import { Dispatch } from "redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
	createAction,
	Action,
	ActionWithPayload,
	withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

export type FetchCategoriesStart =
	Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;
export type FetchCategoriesFailed = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	Error
>;

export type CategoryAction =
	| FetchCategoriesStart
	| FetchCategoriesFailed
	| FetchCategoriesSuccess;

export const fetchCategoriesStart = withMatcher(
	(): FetchCategoriesStart =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
	(categoriesArray: Category[]): FetchCategoriesSuccess =>
		createAction(
			CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
			categoriesArray
		)
);

export const fetchCategoriesFailed = withMatcher(
	(error: Error): FetchCategoriesFailed =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);

/*export const fetchCategoriesAsync = () => async (dispatch: Dispatch) => {
	dispatch(fetchCategoriesStart());
	try {
		const categoriesArray: Category[] = await getCategoriesAndDocuments();
		dispatch(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		if (error instanceof Error) dispatch(fetchCategoriesFailed(error));
	}
};*/
