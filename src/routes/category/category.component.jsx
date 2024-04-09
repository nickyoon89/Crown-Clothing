import { useParams } from 'react-router-dom';
import './category.styles.scss'
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.componet';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])
    return (
        //Fragment can be just <></>
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading ? 
                (<Spinner/>):
                (
                    <div className='category-container'>
                        {
                            products && //safe guard
                                products.map((product)=> <ProductCard key={product.id} product={product}></ProductCard>)
                        }
                    </div>
                )
            }
        </Fragment>
    )
}

export default Category;