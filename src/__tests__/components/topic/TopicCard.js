import ReactDOM from "react-dom";
import React from "react";
import TopicCard from "../../../components/topic/TopicCard";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {store} from "../../../redux/configureStore";

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
        ReactDOM.render(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <TopicCard/>
                </ThemeProvider>
            </Provider>
            , div);
    });
});
