//Why 3rd party library should be in one file is when they change their library, it is easy to change all at once here
import { NextOrObserver, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
import { Category } from "../../store/categories/category.types";

const firebaseConfig = JSON.parse(String(process.env.REACT_APP_FIRE_BASE_CONFIG));
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebaseApp);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  /*export const addCollectionAndDocuments = async (collectionKey:string, objectsToAdd, field = "title") => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef, object[field].toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit(); 
  };*/

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    /*const categoryMap = querySnapshot.docs.reduce((acc, docsSnapshot) => {
      const {title, items} = docsSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    },{});
    return categoryMap;*/
  }

  type Auth = {
    uid: string;
    displayName: string;
    email: string
  }
  export const createUserDocumentFromAuth = async (userAuth:Auth, additionalInformation = {}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch(err){
            if(err instanceof Error) console.log("error creating the user", err.message);
        }
    }

    return userSnapshot;
  }

  export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email:string, password:string) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  //type NextOrObserver<T> = NextFn<T | null> | Observer<T | null>;
  export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    onAuthStateChanged(auth, callback);
    //listener, with auth, next, error and completed, but using only next(callback)
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth, 
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      )
    })
  }