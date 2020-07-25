/** @format */

import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems';
import DrawerToggle from '../sideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked} />
		<div className={classes.Logo}>
	  	<Logo />
		</div>
		<nav className= {classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);

export default Toolbar
