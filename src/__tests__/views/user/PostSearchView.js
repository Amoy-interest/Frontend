import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import PostSearchView from "../../../views/user/PostSearchView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {mount} from "enzyme";

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
                    <PostSearchView location={{
                        hash: "",
                        key: "dernq4",
                        pathname: "/search",
                        search: "",
                        state: {keyword: "校园"}
                    }}/>
                </ThemeProvider>
            </Provider>, div);
    });
});
