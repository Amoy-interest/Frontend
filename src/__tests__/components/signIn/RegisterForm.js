import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import RegisterForm from "../../../components/signIn/RegisterForm";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {mount} from "enzyme";
import 'jest-canvas-mock';
import { Formik } from 'formik';
import {AITextField} from "../../../components/commen/AIField";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: amber[200],
        },
        secondary: {
            main: '#FF5722',
        },
    },
});

describe('actions', () => {
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        ReactDOM.render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <RegisterForm/>
                </ThemeProvider>
            </Provider>, div);
    });

    //Contains Formik
    it('renders Formik', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <RegisterForm/>
                </ThemeProvider>
            </Provider>
        );
        const test = wrapper.find(Formik).at(0);
        expect(test.length).toBe(1);
    });

    //Contains AITextField
    it('renders AITextField', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <RegisterForm/>
                </ThemeProvider>
            </Provider>
        );
        const test = wrapper.find(AITextField);
        expect(test.length).toBe(5);
    });
});
