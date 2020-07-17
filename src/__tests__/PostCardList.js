import React from 'react';
import ReactDOM from 'react-dom';
import PostCardList from "../components/post/PostCardList";
import Enzyme, { shallow, render, mount } from 'enzyme';
//import waitUntil from 'async-wait-until';

describe('actions', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< PostCardList/>, div);
    });

    it('case: expect input & click operation correct', async () => {
        const wrapper = mount(<PostCardList />);

        const input = wrapper.find('input').at(0);
        const button = wrapper.find('button').at(0);

        expect(input.exists());
        expect(button.exists());

        input.simulate('change', {
            target: {
                value: 'lucas'
            }
        });

        expect(wrapper.state('value')).toBe('lucas');

        button.simulate('click');

        //await waitUntil(() => resolve);

        expect(wrapper.state('value')).toBe('')
    });
});

