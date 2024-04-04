import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/auth/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListener((user)=>{
      //User
        if(user){
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });

    //Adding Categories here wouldn't be necessary

    //Categories
      /*const getCategoriesMap = async () =>{
          const categoryMap =  await getCategoriesAndDocuments();
          dispatch(setCategoriesMap(categoryMap));
      };
      getCategoriesMap();*/

    return unsubscribe;
},[/*dispatch*/]); //dispatch will never change

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path="shop/*" element={<Shop />}/>
        <Route path="auth" element={<Authentication />}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
  );
};

export default App;
