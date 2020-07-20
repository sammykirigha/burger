import React from 'react';
import './App.css';
import Aux from './hoc/Aux';
import Layout from './components/layout/Layout';

function App(props) {
  return (
    <Aux>
       <Layout>
         <p>test</p>
       </Layout>
    </Aux>
  );
}

export default App;
