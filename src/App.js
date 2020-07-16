import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import HomePreLoginView from "./views/public/HomePreLoginView";
import HomeView from "./views/user/HomeView";
import ProfileView from "./views/user/ProfileView";
import RegisterView from "./views/public/RegisterView";
import NotFoundView from "./views/public/NotFoundView";
import PostsView from "./views/user/PostsView";
import TopicDiscussionView from "./views/user/TopicDiscussionView";
import PrivateRoute from "./routers/PrivateRouter";
import PublicRoute from "./routers/PublicRouter";
import AdminRoute from "./routers/AdminRouter";
import UsersManageView from "./views/admin/UsersManageView";
import PostsManageView from "./views/admin/PostsManageView";
import TopicsManageView from "./views/admin/TopicsManageView";


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
                    <AdminRoute path='/admin-home' component={HomeView}/>
                    <AdminRoute path='/users-manage' component={UsersManageView}/>
                    <AdminRoute path='/posts-manage' component={PostsManageView}/>
                    <AdminRoute path='/topics-manage' component={TopicsManageView}/>
                    <PublicRoute path='*' component={NotFoundView}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
