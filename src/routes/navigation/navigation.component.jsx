import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; //extract data from redux store
import { selectCurrentUser } from "../../store/user/user.selector";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {NavigationContainer, NavLink, NavLinksContainer, LogoContainer} from "./navigation.styles"
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";


const Navigation = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);
	
	const signOutUser = () => dispatch(signOutStart());
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