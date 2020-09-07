import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import HomeView from "../../../views/user/HomeView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {mount} from "enzyme";
import Carousel from '../../../components/commen/Carousel';

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
                <HomeView/>
            </ThemeProvider>
            </Provider>, div);
    });

    //Contains Carousel
    it('renders carousel', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <HomeView/>
                </ThemeProvider>
            </Provider>
        );
        const carousel=wrapper.find(Carousel).at(0);
        expect(carousel.length).toBe(1);
    });
});
