import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import Container from "@material-ui/core/Container";
import FooterBar from "../components/basic/Footer";
import {createMuiTheme} from "@material-ui/core/styles";
import HeaderAfterLogIn from "../components/basic/HeaderAfterLogIn";
import {ThemeProvider} from "@material-ui/styles";
import {amber} from "@material-ui/core/colors";
import {connect} from "react-redux";
import {UserType} from "../utils/constants";
// import * as userService from "../service/userService"

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

function mapStateToProps(state) {
    return {
        token: state.tokenReducer,
        user: state.userReducer.user
    }
}

class PrivateRoute extends React.Component{

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
            this.state.isAuth ? ( this.props.user !== null && this.props.user.user_type === UserType.CUSTOMER ?
                (<ThemeProvider theme={theme}>
                    <div className="PrivateRouter">
                        <HeaderAfterLogIn/>
                        <Container style={{minHeight: '85vh'}} maxWidth="lg">
                            <main style={{flexGrow: 1, padding: theme.spacing(3)}}>
                                <Component {...props}/>
                            </main>
                        </Container>
                        <FooterBar/>
                    </div>
                </ThemeProvider>) : (
                        <Redirect to={{
                            pathname: '/admin-home',
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
)(PrivateRoute)
