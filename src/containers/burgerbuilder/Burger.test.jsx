import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Burger} from './Burger'
import BuildControls from '../../components/burger/buildControls/BuildControls';

configure({adapter: new Adapter()})

describe('<Burger />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Burger onInitIngredients={() => {}}/>);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ings: {salad: 0}})
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
})

