/** @format */

import React, { Component } from 'react';
import './App.modules.css';
import { connect } from 'react-redux';
import Aux from './hoc/Aux';
import Layout from './components/layout/Layout';
import Burger from './containers/burgerbuilder/Burger';
import Checkout from './containers/checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoLogin();
	}
	render() {
		let routes = (
			<Switch>
				<Route path='/auth' component={Auth} />
				<Route path='/' exact component={Burger} />
				<Redirect to = '/' />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/auth' component={Auth} />
					<Route path='/logout' component={Logout} />
					<Route path='/' exact component={Burger} />
					<Redirect to = '/' />
				</Switch>
			);
		}
		return (
			<Aux>
				<Layout>
					{routes}
				</Layout>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoLogin: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
