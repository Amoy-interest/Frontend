import React from 'react';
import App from './App';
import ReactDOM from "react-dom";
import Provider from "react-redux/lib/components/Provider";
import {store} from "./redux/configureStore";

test('renders learn react link', () => {
    const div = document.createElement('ThemeProvider');
    jest.spyOn(window, 'scrollTo').mockReturnValue();
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>, div);
});
