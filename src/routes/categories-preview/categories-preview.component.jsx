import { Fragment } from 'react';
import { useSelector } from "react-redux"; //extract data from redux store
import CategoryPreview from '../../components/category-preview/category-preview.component';
import {selectCategoriesMap , selectCategoriesIsLoading } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.componet';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        //Fragment can be just <></>
        <Fragment >
            {isLoading?
                (<Spinner/>):
                (
                    Object.keys(categoriesMap).map(
                        title =>{
                            const products = categoriesMap[title];
                                return <CategoryPreview key={title} title={title} products={products}/>
                        }
                    )
                )
            }
        </Fragment>
    )
}
export default CategoriesPreview;