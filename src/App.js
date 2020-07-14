import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import HomePreLoginView from "./views/HomePreLoginView";
import HomeView from "./views/HomeView";
import ProfileView from "./views/ProfileView";
import RegisterView from "./views/RegisterView";
import NotFoundView from "./views/NotFoundView";
import PostsView from "./views/PostsView";
import TopicDiscussionView from "./views/TopicDiscussionView";
import PrivateRoute from "./PrivateRouter";
import PublicRoute from "./PublicRouter";


function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <PublicRoute exact path='/' component={HomePreLoginView}/>
                    <PublicRoute path='/register' component={RegisterView}/>
                    <PrivateRoute path='/home' component={HomeView}/>
                    <PrivateRoute path='/personal-info' component={ProfileView}/>
                    <PrivateRoute path='/posts' component={PostsView}/>
                    <PrivateRoute path='/topic-discussion' component={TopicDiscussionView}/>
                    <PublicRoute path='*' component={NotFoundView}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
