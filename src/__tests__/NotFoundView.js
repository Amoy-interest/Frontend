import React from 'react';
import { shallow } from 'enzyme';
import NotFoundView from '../views/public/NotFoundView';

it('renders welcome message', () => {
    const wrapper = shallow(<NotFoundView />);
    const notfound = <div>404 Not Found!</div>;
    // expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(notfound)).toEqual(true);
});
