import React, {Component} from 'react';
import RegisterForm from "../../components/signIn/RegisterForm";
import withStyles from "@material-ui/core/styles/withStyles";
import Background from "../../assets/img/background7.jpg";
import {amber} from "@material-ui/core/colors";
const styles = ((theme) => ({
    root: {
        backgroundImage: `url(${Background})`,
        backgroundColor: amber[100],
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        //height:800,
        padding:theme.spacing(4)
    },
}));

@withStyles(styles)
class RegisterView extends Component{

    render() {
        return (
            <div className={this.props.classes.root}>
                <RegisterForm/>
            </div>
        );
    }
}

export default RegisterView;
