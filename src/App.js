import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import HomePreLoginView from "./views/HomePreLoginView";
// import {TableHead} from "@material-ui/core";
import HomeView from "./views/HomeView";
import PersonalInfoView from "./views/PersonalInfoView";
import RegisterView from "./views/RegisterView";
import NotFoundView from "./views/NotFoundView";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
        scrollTop: {
            zIndex: theme.zIndex.drawer + 2,
            position: 'fixed',
            bottom: theme.spacing(5),
            right: theme.spacing(3)
        }
    })
)


function App() {
    const classes = useStyles();

    return (
        <div className="App">
            <Router>
                <main className={classes.content}>
                    <Switch>
                        <Route exact path='/' component={HomePreLoginView} />
                        <Route path='/home' component={HomeView} />
                        <Route path='/personal-info' component={PersonalInfoView} />
                        <Route path='/register' component={RegisterView} />
                        <Route path='*' component={NotFoundView} />
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default App;
