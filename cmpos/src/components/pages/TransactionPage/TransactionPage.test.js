import React from 'react';
import { shallow } from 'enzyme';
import TransactionPage from './TransactionPage';

describe('<TransactionPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<TransactionPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
