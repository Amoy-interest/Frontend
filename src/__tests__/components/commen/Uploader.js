import ReactDOM from "react-dom";
import Uploader from "../../../components/commen/Uploader";
import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
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
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ThemeProvider theme={theme_user}>
                <Uploader/>
            </ThemeProvider>
            , div);
    });
});
