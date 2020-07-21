import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burgeer from '../../components/burger/Burgeer'

class Burger extends Component {
  render() {
    return (
      <Aux>
        <Burgeer />
        <div>Burger controls</div>
      </Aux>
    )
  }
}

export default Burger
