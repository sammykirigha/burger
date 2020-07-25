/** @format */

import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/toobar/Toolbar';
import SideDrawer from '../Navigation/sideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	SideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
  };
  
	sideDrawertoggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !this.state.showSideDrawer };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked = {this.sideDrawertoggleHandler} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.SideDrawerClosedHandler}
				/>
				<main className={styles.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
