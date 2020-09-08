import React from 'react';
import ReactDOM from "react-dom";
import ReportForm from "../../../components/commen/ReportForm";
import {shallow,mount} from "enzyme";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Button from "@material-ui/core/Button";

const theme_user = createMuiTheme({
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
        const div = document.createElement('Container');
        ReactDOM.render(
            <ThemeProvider theme={theme_user}>
                <ReportForm/>
            </ThemeProvider>
            ,
            div);
    });

    //Call functions
    it('calls functions', () => {
        const wrapper  = mount(
            <ThemeProvider theme={theme_user}>
                < ReportForm/>
            </ThemeProvider>);
        const moreButton=wrapper.find(Button).at(0);
        expect(moreButton.length).toBe(1);
        moreButton.simulate('click');
        //wrapper.instance().submit({values:'00'});
    });
});
