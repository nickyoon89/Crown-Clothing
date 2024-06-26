import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss'
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName:'',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () =>{
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("password do not match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
            return;
        } catch(error){
            if(error.code === "auth/email-already-in-use"){
                alert("Cannot create user, email already in use");
            }
            console.log("user creation encountered in error", error);
            return;
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
			<div className="sign-up-container">
                <h2>Don't have an account?</h2>
				<span>Sign up with your email and password</span>
				<form onSubmit={handleSubmit}>
					<FormInput
						label="Display Name"
						type="text"
						required
						onChange={handleChange}
						name="displayName"
						value={displayName}
                        //Below is another way to do it, then you can use this object in form-input component, not "...otherProps"
                        /*inputOptions = {{
                            type: "text",
                            required: true,
                            onChange: handleChange,
                            name: "displayName",
                            value: displayName
                        }} */
					/>
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
					<FormInput
						label="Confirm Password"
						type="password"
						required
						onChange={handleChange}
						name="confirmPassword"
						value={confirmPassword}
					/>

					<Button type="submit">Sign Up</Button>
				</form>
			</div>
		);
}

export default SignUpForm;