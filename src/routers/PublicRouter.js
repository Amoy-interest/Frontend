import React from 'react';
import {Route} from 'react-router-dom'
import {Layout} from "antd";
import Container from "@material-ui/core/Container";
import FooterBar from "../components/basic/Footer";
import {createMuiTheme, createStyles, makeStyles} from "@material-ui/core/styles";
import HeaderBar from "../components/basic/Header";
import {amber} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";

const {Content, Header, Footer} = Layout;
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
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        container: {
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
export default function PublicRoute(props) {
    const classes = useStyles();


    const {component: Component, path = "/", exact = false, strict = false} = props;

    return <Route path={path} exact={exact} strict={strict} render={props => (
        <ThemeProvider theme={theme}>
            <div className="PublicRouter">
                <Layout>
                    <Header>
                        <HeaderBar/>
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
    )}/>
}

