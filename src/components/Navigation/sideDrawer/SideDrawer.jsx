/** @format */

import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UserInterface/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.open]
  }
	return (
		<Aux>
      <Backdrop show = {props.open} clicked = {props.closed} />
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

export default SideDrawer;
