/** @format */

import React, { Component } from 'react';
import './App.modules.css';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Aux from './hoc/Aux';
import Layout from './components/layout/Layout';
import Burger from './containers/burgerbuilder/Burger';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth')
})

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoLogin();
	}
	render() {
		let routes = (
			<Switch>
				<Route path='/auth' component={asyncAuth} />
				<Route path='/' exact component={Burger} />
				<Redirect to = '/' />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path='/checkout' component={asyncCheckout} />
					<Route path='/orders' component={asyncOrders} />
					<Route path='/auth' component={asyncAuth} />
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
