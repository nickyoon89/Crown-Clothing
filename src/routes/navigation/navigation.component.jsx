import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer, NavLink, NavLinksContainer, LogoContainer} from "./navigation.styles"

const Navigation = () => {
	const {currentUser} = useContext(UserContext); //will re-run if currentUser changes
	const {isCartOpen} = useContext(CartContext);

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo className="logo"/>
				</LogoContainer>
				<NavLinksContainer>
					<NavLink to="/shop"> 
						SHOP
					</NavLink>
					{
						currentUser?
							(<NavLink as='span' onClick={signOutUser}>
								SIGN OUT
							</NavLink>): 
							(<NavLink to="/auth"> 
								SIGN IN
							</NavLink>)
					}
					<CartIcon/>
				</NavLinksContainer>
				{isCartOpen&&<CartDropdown/> /* if isCartOpen is true, show the dropdown */} 
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;