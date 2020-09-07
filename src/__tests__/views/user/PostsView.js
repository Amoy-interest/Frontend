import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import PostsView from "../../../views/user/PostsView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {mount} from "enzyme";
import PostForm from "../../../components/post/PostForm";

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
                    <PostsView />
                </ThemeProvider>
            </Provider>, div);
    });

    // Contains PostForm
    it('renders PostForm', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <PostsView/>
                </ThemeProvider>
            </Provider>
        );
        const test=wrapper.find(PostForm).at(0);
        expect(test.length).toBe(1);
    });
});
