/** @format */

import React, { Component } from 'react';
import {connect} from 'react-redux'
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
				<Toolbar 
				isAuth={this.props.isAuthenticated}
				drawerToggleClicked = {this.sideDrawertoggleHandler} />
				<SideDrawer
				  isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.SideDrawerClosedHandler}
				/>
				<main className={styles.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);
