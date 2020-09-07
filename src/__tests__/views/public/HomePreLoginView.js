import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import HomePreLoginView from "../../../views/public/HomePreLoginView";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import {ThemeProvider} from "@material-ui/styles";
import Carousel from "../../../components/commen/Carousel";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";

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
    jest.spyOn(window, 'scrollTo').mockReturnValue();
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}>
            <ThemeProvider theme={theme_user}>
                <HomePreLoginView/>
            </ThemeProvider>
        </Provider> , div);
    });

    //Contains Carousel
    // it('renders carousel', () => {
    //     jest.spyOn(window, 'scrollTo').mockReturnValue();
    //     const wrapper = mount(
    //         <Provider store={store}>
    //             <ThemeProvider theme={theme_user}>
    //                 <HomePreLoginView/>
    //             </ThemeProvider>
    //         </Provider>
    //     );
    //     const carousel=wrapper.find(Carousel).at(0);
    //     expect(carousel.length).toBe(1);
    // });

});