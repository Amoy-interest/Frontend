import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBar from "../components/basic/HeaderPre";
import PostCard from "../components/post/PostCard";
import IconButton from "@material-ui/core/IconButton";
import CommentList from "../components/post/CommentList";
import Menu from "@material-ui/core/Menu";
import ReactDOM from "react-dom";
import Enzyme, { shallow, render, mount } from 'enzyme';

describe('actions', () => {
    // it('renders correctly', () => {
    //     const tree = renderer
    //         .create(<HeaderBar/>)
    //         .toJSON();
    //
    //     expect(tree).toMatchSnapshot();
    // });

    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< HeaderBar/>, div);
    });
    // Interact correctly
    it('case: expect contains menu', async () => {
        const wrapper = mount(<HeaderBar/>);

        const moreButton=wrapper.find(IconButton).at(1);
        expect(moreButton.length).toBe(1);
        moreButton.simulate('click');
        const menu=wrapper.find(Menu).at(0);
        expect(menu.length).toBe(1);

    });

});
