import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import AdminUsersManageView from "../../../views/admin/AdminUsersManageView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminTopicList from "../../../components/admin/tables/AdminTopicList";
import {mount} from "enzyme";
import 'jest-canvas-mock';
import {useHistory} from "react-router";

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
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        ReactDOM.render(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <AdminUsersManageView/>
                </ThemeProvider>
            </Provider>, div);
    });

    //Contains AdminTopicList
    it('contains  a AdminSideBar', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <AdminUsersManageView/>
                </ThemeProvider>
            </Provider>
        );

        const table=wrapper.find(AdminSideBar).at(0);
        expect(table.length).toBe(1);
    });
});
