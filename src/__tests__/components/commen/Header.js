import React from 'react';
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import Header from "../../../components/commen/Header";
import {mount, shallow} from "enzyme";
import {Provider} from "react-redux";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
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
    // it('renders without crashing', () => {
    //     const div = document.createElement('div');
    //     ReactDOM.render(
    //         <Provider store={store}>
    //             <ThemeProvider theme={theme_user}>
    //                 <Header user_id={1}/>
    //             </ThemeProvider>
    //         </Provider>, div);
    // });

    it('calls functions', () => {
        // const wrapper  = shallow(
        //     <Provider store={store}>
        //         <ThemeProvider theme={theme_user}>
        //             <Header/>
        //         </ThemeProvider>
        //     </Provider>);
        // const spyFunction = jest.spyOn(wrapper.instance(),"handleLogout");
        // wrapper.instance().handleLogout()
        // wrapper.instance().cancel();
        // expect(spyFunction).toHaveBeenCalled();
        // spyFunction.mockRestore();
    });

});
