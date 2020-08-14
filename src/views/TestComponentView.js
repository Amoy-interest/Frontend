import React, {Component} from 'react';
import ProfileEditForm from "../components/profile/ProfileEditForm";
import {withStyles} from "@material-ui/core";
import PositioningActionsColumn from "../components/commen/Table"
const style = ((theme) => ({
    container: {
        backgroundColor: '#cfe8fc'
    }
}));

@withStyles(style)
class TestComponentView extends Component{
    constructor(props) {
        super(props);

        this.state = {
            values: null
        };

        this.handleGetProps = this.handleGetProps.bind(this);
        this.getValues = this.getValues.bind(this);
    }

    getValues(values) {
        this.setState({values: values});
    }

    handleGetProps(){
        console.log(this.state);
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                TestComponentView page!
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <PositioningActionsColumn/>
                <div className={classes.container}>
                    <ProfileEditForm submit={this.getValues}/>
                </div>
            </div>
        );
    }
}

export default TestComponentView;
