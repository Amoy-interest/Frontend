import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import Container from "@material-ui/core/Container";
import FooterBar from "../components/basic/Footer";
import {createMuiTheme } from "@material-ui/core/styles";
import AdminHeader from "../components/admin/AdminHeader";
import {blue,indigo} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";
import {connect} from "react-redux";
import {UserType} from "../utils/constants";

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

function mapStateToProps(state) {
    return {
        token: state.tokenReducer,
        user: state.userReducer.user
    }
}

class AdminRoute extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            hasAuth: false
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.checkAuth(this.props.token);
    }

    checkAuth = (token) => {
        console.log(token);

        if (token === '') this.setState({hasAuth: true});
        else this.setState({
            isAuth: true,
            hasAuth: true
        })
    };


    render() {

        const {component: Component, path = "/", exact = false, strict = false} = this.props;

        if (!this.state.hasAuth) {
            return null;
        }

        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.isAuth ? ( this.props.user !== null && this.props.user.user_type === UserType.ADMIN ?
                <ThemeProvider theme={theme}>
                    <div className="AdminRouter">
                        <AdminHeader/>
                        <Container style={{ minHeight: '100vh'}} maxWidth="lg">
                            <main style={{flexGrow: 1, padding: theme.spacing(3)}}>
                                <Component {...props}/>
                            </main>
                        </Container>
                        <FooterBar/>
                    </div>
                </ThemeProvider> : (
                        <Redirect to={{
                            pathname: '/home',
                            state: {from: props.location}
                        }}/>
                    )
            ) : (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }


}

export default connect(
    mapStateToProps,
    null
)(AdminRoute)
