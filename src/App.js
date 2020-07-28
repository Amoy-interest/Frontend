import React,{useState} from 'react';
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
import TestReduxView from "./views/TestReduxView";
import {createMuiTheme, createStyles, makeStyles} from "@material-ui/core/styles";
import {amber, blue, indigo} from "@material-ui/core/colors";
import {connect} from "react-redux";
import HeaderAfterLogIn from "./components/commen/Header";
import Container from "@material-ui/core/Container";
import FooterBar from "./components/commen/Footer";
import {ThemeProvider} from "@material-ui/styles";
import {AuthorityLevel, MsgType, UserType} from "./utils/constants";
import {Route} from 'react-router-dom';
import HeaderPre from "./components/commen/HeaderPre";
import PostDetailView from "./views/user/PostDetailView";
import Message from "./components/commen/Message";
import PubSub from "pubsub-js";
import PostSearchView from "./views/user/PostSearchView";
import TestAliView from "./views/TestAliView";

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
    const [keyword, setKeyword] = useState(null);
    const [message, setMessage] = React.useState({
        open: false,
        text: '',
        type: 'warning'
    });
    PubSub.subscribe(MsgType.SET_MESSAGE, function (msg, data) {
        console.log(data);
        setMessage(data);
    });

    const renderMergedProps = (component, ...rest) => {
        const finalProps = Object.assign({}, ...rest);
        return (
            React.createElement(component, finalProps)
        );
    };

    const PropsRoute = ({ component, ...rest }) => {
        return (
            <Route {...rest} render={routeProps => {
                return renderMergedProps(component, routeProps, rest);
            }}/>
        );
    };

    const handleSearch = (keyword) => {
        console.log(keyword);
        setKeyword(keyword);
    };

    return (
        <div className="App">
            <ThemeProvider theme={props.role === UserType.ADMIN ? theme_admin: theme_user}>
                <Router>
                    <PropsRoute
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
                            (props.role === UserType.VISITOR && HeaderPre) || HeaderAfterLogIn
                        }
                        handleSearch={handleSearch}
                    />
                    <Container className={classes.container} maxWidth="lg">
                        <main className={classes.content}>
                            <Switch>
                                <Route exact path='/' component={HomePreLoginView}/>
                                <Route path='/register' component={RegisterView}/>
                                <Route path='/test-redux' component={TestReduxView}/>
                                <Route path='/test-ali' component={TestAliView}/>
                                <PrivateRoute path='/home' component={HomeView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path='/personal-info' component={ProfileView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path='/posts' component={PostsView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path='/topic-discussion' component={TopicDiscussionView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path="/post-detail" component={PostDetailView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path="/search" component={PostSearchView} authority={AuthorityLevel.CUSTOMER}/>
                                <PrivateRoute path='/users-manage' component={AdminUsersManageView} authority={AuthorityLevel.ADMIN} keyword={keyword}/>
                                <PrivateRoute path='/posts-manage' component={AdminPostsManageView} authority={AuthorityLevel.ADMIN} keyword={keyword}/>
                                <PrivateRoute path='/topics-manage' component={AdminTopicsManageView} authority={AuthorityLevel.ADMIN} keyword={keyword}/>
                                <PrivateRoute path='/sensWords-manage' component={AdminSensWordsManageView} authority={AuthorityLevel.ADMIN} keyword={keyword}/>
                                <Route path='*' component={NotFoundView}/>
                            </Switch>
                        </main>
                    </Container>
                    <FooterBar/>
                </Router>
                <Message
                    messageOpen={message.open}
                    handleClose={() => setMessage({open:false})}
                    type={message.type}
                    text={message.text}
                />
            </ThemeProvider>
        </div>
    );
}

export default connect(
    mapStateToProps,
    null
)(App)
