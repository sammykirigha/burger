import React from 'react';
import './App.modules.css';
import Aux from './hoc/Aux';
import Layout from './components/layout/Layout';
import Burger from './containers/burgerbuilder/Burger';

function App(props) {
  return (
    <Aux>
       <Layout>
         <Burger />
       </Layout>
    </Aux>
  );
}

export default App;
