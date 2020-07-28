/** @format */

import React, { Component } from 'react';
import './App.modules.css';
import Aux from './hoc/Aux';
import Layout from './components/layout/Layout';
import Burger from './containers/burgerbuilder/Burger';
import Checkout from './containers/checkout/Checkout';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Aux>
				<Layout>
					<Switch>
						<Route path='/checkout' component={Checkout} />
						<Route path='/' exact component={Burger} />
					</Switch>
				</Layout>
			</Aux>
		);
	}
}

export default App;
