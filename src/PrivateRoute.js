import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        token: state.tokenReducer,
        role: state.userReducer.role
    }
}

class PrivateRoute extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            hasAuth: false,
            keyword: null
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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.keyword);
        this.setState({keyword: nextProps.keyword});
    }

    render() {
        const {component: Component, path = "/", exact = false, strict = false} = this.props;

        if (!this.state.hasAuth) {
            return null;
        }

        return <Route path={path} exact={exact} strict={strict} render={props => (
            (this.state.isAuth && this.props.role >= this.props.authority ) ?
                (<Component {...props} keyword={this.state.keyword}/>) : (
                    <Redirect to={{
                        pathname: '/',
                        state: {from: props.location}
                }}/>)
        )}/>
    }
}


export default connect(
    mapStateToProps,
    null
)(PrivateRoute)
