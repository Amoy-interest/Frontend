import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import RegisterView from "../../../views/public/RegisterView";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import RegisterForm from "../../../components/signIn/RegisterForm";

describe('actions', () => {
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><RegisterView/></Provider> , div);
    });

    //Contains RegisterForm
    it('renders register form', () => {
        const wrapper = mount(<Provider store={store}><RegisterView/></Provider>);
        //expect(wrapper.contains(registerForm)).toEqual(true);
        const form=wrapper.find(RegisterForm).at(0);
        expect(form.length).toBe(1);
    });

});
