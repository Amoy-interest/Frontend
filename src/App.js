import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import HomePreLoginView from "./views/HomePreLoginView";
import HomeView from "./views/HomeView";
import PersonalInfoView from "./views/PersonalInfoView";
import RegisterView from "./views/RegisterView";
import NotFoundView from "./views/NotFoundView";
import FooterBar from "./components/basic/Footer";
import HeaderBar from "./components/basic/Header";
import {Layout} from "antd";
import Container from "@material-ui/core/Container";
import HeaderAfterLogIn from "./components/basic/HeaderAfterLogIn";
import PostsView from "./views/PostsView";
import TopicDiscussionView from "./views/TopicDiscussionView";
const { Content, Header, Footer } = Layout;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        container:{
            //backgroundColor: '#cfe8fc',
            minHeight: '85vh',
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
    const logged=1;
    //localStorage.setItem('logged',logged.toString());
    return (
        <div className="App">
            <Router>
                <Layout>
                    <Header>
                        {logged?<HeaderAfterLogIn/>:<HeaderBar/>}
                    </Header>
                    <Content>
                        <Container className={classes.container} maxWidth="lg">
                            <main className={classes.content}>
                                <Switch>
                                    <Route exact path='/' component={HomePreLoginView} />
                                    <Route path='/home' component={HomeView} />
                                    <Route path='/personal-info' component={PersonalInfoView} />
                                    <Route path='/register' component={RegisterView} />
                                    <Route path='/posts' component={PostsView} />
                                    <Route path='/topic-discussion' component={TopicDiscussionView} />
                                    <Route path='*' component={NotFoundView} />
                                </Switch>
                            </main>
                        </Container>
                    </Content>
                    <Footer>
                        <FooterBar/>
                    </Footer>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
