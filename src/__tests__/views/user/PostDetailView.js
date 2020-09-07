import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import PostDetailView from "../../../views/user/PostDetailView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {mount} from "enzyme";
import PostDetail from "../../../components/post/PostDetail";
import SimilarPostsList from "../../../components/recommend/SimilarPostsList";

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
                    <PostDetailView location={{
                        hash: "",
                        key: "itsa4v",
                        pathname: "/post-detail",
                        search: "?id=8002"
                    }}/>
                </ThemeProvider>
            </Provider>, div);
    });

    // Contains PostDetail
    it('renders PostDetail', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <PostDetailView location={{
                        hash: "",
                        key: "itsa4v",
                        pathname: "/post-detail",
                        search: "?id=8002"
                    }}/>
                </ThemeProvider>
            </Provider>
        );
        const postDetail=wrapper.find(PostDetail).at(0);
        expect(postDetail.length).toBe(1);
    });

    // Contains SimilarPostsList
    it('renders SimilarPostsList', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <PostDetailView location={{
                        hash: "",
                        key: "itsa4v",
                        pathname: "/post-detail",
                        search: "?id=8002"
                    }}/>
                </ThemeProvider>
            </Provider>
        );
        const similarPostsList=wrapper.find(SimilarPostsList).at(0);
        expect(similarPostsList.length).toBe(1);
    });


});
