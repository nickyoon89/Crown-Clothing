import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {  
    auth, //auth history memory?
	signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () =>{
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email,password));
            resetFormFields();
            return;
        } catch(error){
            switch (error.code) {
                case "auth/wrong-password":
                    alert('incorrect password for email');
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    useEffect(() => {
        const getAuth = async () => {
            const response = await getRedirectResult(auth);
		    if(response){
                await createUserDocumentFromAuth(auth);
            }
        }
		getAuth();
	}, []);

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart())
	};
    return (
			<div className="sign-in-container">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Email"
                        type="email"
                        required
                        onChange={handleChange}
                        name="email"
                        value={email}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        required
                        onChange={handleChange}
                        name="password"
                        value={password}
                    />
                    <div className="buttons-container">
                        <Button type="submit">Sign In</Button>
                        <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                        <Button style={{display:"none"}} onClick={signInWithGoogleRedirect}>
                            Sign in with Google Redirect
                        </Button>
                    </div>
                </form>
			</div>
		);
}

export default SignInForm;