import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import './App.css';
import HomePreLoginView from "./views/public/HomePreLoginView";
import HomeView from "./views/user/HomeView";
import ProfileView from "./views/user/ProfileView";
import RegisterView from "./views/public/RegisterView";
import NotFoundView from "./views/public/NotFoundView";
import PostsView from "./views/user/PostsView";
import TopicDiscussionView from "./views/user/TopicDiscussionView";
import PrivateRoute from "./PrivateRoute";
import AdminUsersManageView from "./views/admin/AdminUsersManageView";
import AdminPostsManageView from "./views/admin/AdminPostsManageView";
import AdminTopicsManageView from "./views/admin/AdminTopicsManageView";
import AdminSensWordsManageView from './views/admin/AdminSensWordsManageView';
import TestView from "./views/TestView";
import {createMuiTheme, createStyles, makeStyles} from "@material-ui/core/styles";
import {amber, blue, indigo} from "@material-ui/core/colors";
import {connect} from "react-redux";
import HeaderAfterLogIn from "./components/commen/Header";
import Container from "@material-ui/core/Container";
import FooterBar from "./components/commen/Footer";
import {ThemeProvider} from "@material-ui/styles";
import {AuthorityLevel, UserType} from "./utils/constants";
import {Route} from 'react-router-dom';
import HeaderPre from "./components/commen/HeaderPre";

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

const theme_admin = createMuiTheme({
    palette: {
        primary: {
            main:indigo[400],
        },
        secondary: {
            main: blue[200],
        },
    },
});

function mapStateToProps(state) {
    return {
        role: state.userReducer.role
    }
}

const useStyles = makeStyles((theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        container: {
            //backgroundColor: '#cfe8fc',
            minHeight: '85vh',
        }
    })
)

function App(props) {
    const classes = useStyles();
    return (
        <div className="App">
            <ThemeProvider theme={props.role === UserType.ADMIN ? theme_admin: theme_user}>
                <Router>
                    <Route
                        path={[
                            '/',
                            '/home',
                            '/personal-info',
                            '/posts',
                            '/topic-discussion',
                            '/users-manage',
                            '/posts-manage',
                            '/topics-manage',
                            '/sensWords-manage'
                        ]}
                        component={
                            (props.role === UserType.VISITOR && HeaderPre) ||HeaderAfterLogIn
                        }
                    />
                    <Container className={classes.container} maxWidth="lg">
                        <main className={classes.content}>
                            <Switch>
                                <Route exact path='/' component={HomePreLoginView}/>
                                <Route path='/register' component={RegisterView}/>
                                <PrivateRoute path='/home' component={HomeView} authority={AuthorityLevel.CUSTOMER}/>
                                <Route path='/test' component={TestView}/>
                                <PrivateRoute path='/personal-info' component={ProfileView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path='/posts' component={PostsView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path='/topic-discussion' component={TopicDiscussionView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path='/users-manage' component={AdminUsersManageView} authority={AuthorityLevel.ADMIN}/>
                                <PrivateRoute path='/posts-manage' component={AdminPostsManageView} authority={AuthorityLevel.ADMIN}/>
                                <PrivateRoute path='/topics-manage' component={AdminTopicsManageView} authority={AuthorityLevel.ADMIN}/>
                                <PrivateRoute path='/sensWords-manage' component={AdminSensWordsManageView} authority={AuthorityLevel.ADMIN}/>
                                <Route path='*' component={NotFoundView}/>
                            </Switch>
                        </main>
                    </Container>
                    <FooterBar/>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default connect(
    mapStateToProps,
    null
)(App)
