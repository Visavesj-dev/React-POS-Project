import React from 'react';
import { shallow } from 'enzyme';
import StockCreatePage from './StockCreatePage';

describe('<StockCreatePage />', () => {
  test('renders', () => {
    const wrapper = shallow(<StockCreatePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
