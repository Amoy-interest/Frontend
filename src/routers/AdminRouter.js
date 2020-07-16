import React from 'react';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom'
import {Layout} from "antd";
import Container from "@material-ui/core/Container";
import FooterBar from "../components/basic/Footer";
import {createMuiTheme, createStyles, makeStyles} from "@material-ui/core/styles";
import HeaderAfterLogIn from "../components/basic/HeaderAfterLogIn";
import HeaderForAdmin from "../components/admin/HeaderForAdmin";
import {blue,indigo,amber} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main:indigo[400],
        },
        secondary: {
            main: blue[200],
        },
    },
});
const {Content, Header, Footer} = Layout;
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        content: {
            flexGrow: 1,
            //padding: theme.spacing(3),
        },
        container: {
            //backgroundColor: '#cfe8fc',
            minHeight: '100vh',
        },
        scrollTop: {
            zIndex: theme.zIndex.drawer + 2,
            position: 'fixed',
            bottom: theme.spacing(5),
            right: theme.spacing(3)
        }
    })
)
export default function AdminRoute(props) {
    const classes = useStyles();
    const isAuthed = true;
    const hasAuthed = true;
    // checkAuth = (data) => {
    //     console.log(data);
    //     if (data.status >= 0) {
    //         this.setState({isAuthed: true, hasAuthed: true});
    //     } else {
    //         message.error(data.msg);
    //         localStorage.removeItem('user');
    //         this.setState({isAuthed: false, hasAuthed: true});
    //     }
    // };
    //
    //
    // componentDidMount() {
    //     userService.checkSession(this.checkAuth);
    // }


    const {component: Component, path = "/", exact = false, strict = false} = props;

    if (!hasAuthed) {
        return null;
    }

    return <Route path={path} exact={exact} strict={strict} render={props => (
        isAuthed ? (
            <ThemeProvider theme={theme}>
                <div className="AdminRouter">
                    <Layout>
                        <Header>
                            <HeaderForAdmin/>、
                        </Header>
                        <Content>
                            <Container className={classes.container} maxWidth="lg">
                                <main className={classes.content}>
                                    <Component {...props}/>
                                </main>
                            </Container>
                        </Content>
                        <Footer>
                            <FooterBar/>
                        </Footer>
                    </Layout>
                </div>
            </ThemeProvider>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
}
