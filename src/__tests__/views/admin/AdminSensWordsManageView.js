import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import AdminSensWordsManageView from "../../../views/admin/AdminSensWordsManageView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import AdminSenseWordList from "../../../components/admin/tables/AdminSenseWordList";
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
                    <AdminSensWordsManageView/>
                </ThemeProvider>
            </Provider>, div);
    });

    //Contains AdminSenseWordList
    it('renders AdminSenseWordList', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <AdminSensWordsManageView/>
                </ThemeProvider>
            </Provider>
        );
        const table=wrapper.find(AdminSenseWordList).at(0);
        expect(table.length).toBe(1);
    });
});
