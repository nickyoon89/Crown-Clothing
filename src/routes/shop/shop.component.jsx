import { Route, Routes } from "react-router-dom"
import "./shop.styles.scss"
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../../store/categories/category.reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoriesArray = await getCategoriesAndDocuments('categories');
            dispatch(setCategories(categoriesArray));
        };
        getCategoriesMap();
    },[])
    return(
        <Routes>
            <Route index element={<CategoriesPreview/>}></Route>
            <Route path=":category" element={<Category/>}></Route>
        </Routes>
    )
}

export default Shop;