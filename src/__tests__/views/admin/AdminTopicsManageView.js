import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import AdminTopicsManageView from "../../../views/admin/AdminSensWordsManageView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import {mount, shallow,render} from "enzyme";
import 'jest-canvas-mock';

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
        const div = document.createElement('div');
        const historyMock = {push:jest.fn()};
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        ReactDOM.render(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <AdminTopicsManageView history={historyMock}/>
                </ThemeProvider>
            </Provider>, div);
    });

    it('renders', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const historyMock = {push:jest.fn()};
        const wrapper = render(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <AdminTopicsManageView history={historyMock}/>
                </ThemeProvider>
            </Provider>
        );
    });
    //Contains AdminTopicList
    it('contains AdminSideBar', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const historyMock = {push:jest.fn()};
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <AdminTopicsManageView history={historyMock}/>
                </ThemeProvider>
            </Provider>
        );

        const table=wrapper.find(AdminSideBar).at(0);
        expect(table.length).toBe(1);
    });
});
