import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import AdminPostsManageView from "../../../views/admin/AdminPostsManageView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import AdminPostList from "../../../components/admin/tables/AdminPostList";
import {mount} from "enzyme";
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
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        ReactDOM.render(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <AdminPostsManageView/>
                </ThemeProvider>
            </Provider>, div);
    });

    //Contains AdminPostList
    it('renders AdminPostList', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <AdminPostsManageView/>
                </ThemeProvider>
            </Provider>
        );
        const table=wrapper.find(AdminPostList).at(0);
        expect(table.length).toBe(1);
    });
});
