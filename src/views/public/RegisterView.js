import React, {Component} from 'react';
import RegisterForm from "../../components/signIn/RegisterForm";

class RegisterView extends Component{

    render() {
        return (
            <div className="home-content">
                <RegisterForm/>
            </div>
        );
    }
}

export default RegisterView;
