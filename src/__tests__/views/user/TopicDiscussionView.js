import ReactDOM from "react-dom";
import React from "react";
import {store} from '../../../redux/configureStore';
import TopicDiscussionView from "../../../views/user/TopicDiscussionView";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Provider from "react-redux/lib/components/Provider";
import {mount} from "enzyme";
import TopicCard from "../../../components/topic/TopicCard";

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
                    <TopicDiscussionView location={{
                        hash: "",
                        key: "xpu7ip",
                        pathname: "/topic-discussion",
                        search: "",
                        state: {topic_name: "zz"}
                    }}/>
                </ThemeProvider>
            </Provider>, div);
    });

    // Contains TopicCard
    it('renders TopicCard', () => {
        jest.spyOn(window, 'scrollTo').mockReturnValue();
        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme_user}>
                    <TopicDiscussionView location={{
                        hash: "",
                        key: "xpu7ip",
                        pathname: "/topic-discussion",
                        search: "",
                        state: {topic_name: "zz"}
                    }}/>
                </ThemeProvider>
            </Provider>
        );
        const test=wrapper.find(TopicCard).at(0);
        expect(test.length).toBe(1);
    });
    //
    // // Contains SideBarForProfile
    // it('renders SideBarForProfile', () => {
    //     jest.spyOn(window, 'scrollTo').mockReturnValue();
    //     const wrapper = mount(
    //         <Provider store={store}>
    //             <ThemeProvider theme={theme_user}>
    //                 <ProfileView location={{
    //                     hash: "",
    //                     key: "xpu7ip",
    //                     pathname: "/personal-info",
    //                     search: "?id=10339",
    //                     state: undefined
    //                 }}/>
    //             </ThemeProvider>
    //         </Provider>
    //     );
    //     const test=wrapper.find(SimilarUsersList).at(0);
    //     expect(test.length).toBe(1);
    // });
});
