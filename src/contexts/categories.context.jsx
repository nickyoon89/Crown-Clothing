import { createContext, useEffect, useState } from "react";

import { /*addCollectionAndDocuments,*/ getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

//import SHOP_DATA from "../shop-data.js"

export const CategoriesContext = createContext({
    categoriesMap: [],
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoryMap =  await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    },[]);

    /* this is to add categories to firebase db, don't need it anymore unless there is a change in shop-data
    useEffect(()=>{
        addCollectionAndDocuments("categories", SHOP_DATA);
    },[]);
    */
    const value = {categoriesMap };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}