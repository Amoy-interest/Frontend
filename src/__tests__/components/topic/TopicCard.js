import ReactDOM from "react-dom";
import React from "react";
import TopicCard, {Topic} from "../../../components/topic/TopicCard";
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
                <Topic location={{
                    hash: "",
                    key: "itsa4v",
                    pathname: "/topic-discussion",
                    state: {topic_name: 'hi'}
                }}/>
            </ThemeProvider>
            , div);
    });
    //expect contains menu
    // it('case: expect contains menu', async () => {
    //     const wrapper = mount(
    //         <Provider store={store}>
    //             <ThemeProvider theme={theme_user}>
    //                 <TopicCard location={{
    //                     hash: "",
    //                     key: "itsa4v",
    //                     pathname: "/topic-discussion",
    //                     state: {topic_name: 'hi'}
    //                 }}/>
    //             </ThemeProvider>
    //         </Provider>
    //     );
    //     wrapper.setState({topic:{}});
    //     const moreButton=wrapper.find(IconButton).at(0);
    //     expect(moreButton.length).toBe(1);
    //     moreButton.simulate('click');
    //     const menu=wrapper.find(Menu).at(0);
    //     expect(menu.length).toBe(1);
    //
    // });
});
