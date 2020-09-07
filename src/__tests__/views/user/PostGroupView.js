import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import PostGroupView from "../../../views/user/PostGroupView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {mount} from "enzyme";
import HotSearchList from "../../../components/hot/HotSearchList";

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
                    <PostGroupView location={{
                        hash: "",
                        key: "dernq4",
                        pathname: "/group",
                        search: "",
                        state: {group_name: "校园", index: 1}
                    }}/>
                </ThemeProvider>
            </Provider>, div);
    });

    // Contains PostCardList
    it('renders PostCardList', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <PostGroupView location={{
                        hash: "",
                        key: "dernq4",
                        pathname: "/group",
                        search: "",
                        state: {group_name: "校园", index: 1}
                    }}/>
                </ThemeProvider>
            </Provider>
        );
        const hotSearchList=wrapper.find(HotSearchList).at(0);
        expect(hotSearchList.length).toBe(1);
    });
});
