import React from 'react';
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import HeaderPre from "../../../components/commen/HeaderPre";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Logo from "../../../components/commen/Logo";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {store} from "../../../redux/configureStore";
import IconButton from "@material-ui/core/IconButton";
import Menu from '@material-ui/core/Menu';
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
    it('renders without crashing', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <HeaderPre />
                </ThemeProvider>
            </Provider>
            );
        const logo=<Logo title="Amoy Interest"/>;
        expect(wrapper.contains(logo)).toEqual(true);
    });

    //Interact correctly
    it('case: expect contains menu', async () => {
            const wrapper = mount(
                <Provider store={store}>
                    <ThemeProvider theme={theme_user}>
                        <HeaderPre />
                    </ThemeProvider>
                </Provider>
                );

            const moreButton=wrapper.find(IconButton).at(0);
            expect(moreButton.length).toBe(1);
            moreButton.simulate('click');
            const menu=wrapper.find(Menu).at(0);
            expect(menu.length).toBe(1);

        });

});
