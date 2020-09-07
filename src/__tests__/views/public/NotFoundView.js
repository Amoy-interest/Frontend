import React from 'react';
import { shallow } from 'enzyme';
import NotFoundView from '../../../views/public/NotFoundView';

it('renders not found message', () => {
    //contains not found message
    const wrapper = shallow(<NotFoundView />);
    const notfound = <div>404 Not Found!</div>;
    expect(wrapper.contains(notfound)).toEqual(true);
});
