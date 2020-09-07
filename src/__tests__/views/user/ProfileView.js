import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import ProfileView from "../../../views/user/ProfileView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {mount} from "enzyme";
import SideBarForProfile from "../../../components/profile/PofileSideBar";
import SimilarUsersList from "../../../components/recommend/SimilarUsersList";

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
                    <ProfileView location={{
                        hash: "",
                        key: "xpu7ip",
                        pathname: "/personal-info",
                        search: "?id=10339",
                        state: undefined
                    }}/>
                </ThemeProvider>
            </Provider>, div);
    });

    // Contains SideBarForProfile
    it('renders SideBarForProfile', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <ProfileView location={{
                        hash: "",
                        key: "xpu7ip",
                        pathname: "/personal-info",
                        search: "?id=10339",
                        state: undefined
                    }}/>
                </ThemeProvider>
            </Provider>
        );
        const test=wrapper.find(SideBarForProfile).at(0);
        expect(test.length).toBe(1);
    });

    // Contains SideBarForProfile
    it('renders SideBarForProfile', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <ProfileView location={{
                        hash: "",
                        key: "xpu7ip",
                        pathname: "/personal-info",
                        search: "?id=10339",
                        state: undefined
                    }}/>
                </ThemeProvider>
            </Provider>
        );
        const test=wrapper.find(SimilarUsersList).at(0);
        expect(test.length).toBe(1);
    });
});
