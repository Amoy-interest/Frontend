import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'

const store = configureStore()

const theme = createMuiTheme({
    palette: {
        primary: {
            main: amber[200],
        },
        secondary: {
            main: '#FF5722',
        },
    },
});

ReactDOM.render(
      <React.StrictMode>
         <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
         </Provider>
      </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
