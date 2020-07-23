import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store, persist} from './redux/configureStore'
import {PersistGate} from 'redux-persist/lib/integration/react';

class AppComplete extends Component {

    render(){
        return (
            <React.Fragment>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persist}>
                        <App />
                    </PersistGate>
                </Provider>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
  <AppComplete/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
