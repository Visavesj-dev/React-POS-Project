import React from 'react';
import { shallow } from 'enzyme';
import StockEditPage from './StockEditPage';

describe('<StockEditPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<StockEditPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
