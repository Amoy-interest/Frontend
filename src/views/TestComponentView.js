import React, {Component} from 'react';
import ProfileEditForm from "../components/profile/ProfileEditForm";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";

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
                <div className={classes.container}>
                    <ProfileEditForm submit={this.getValues}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Button variant="contained" color="primary"
                            onClick={this.handleGetProps}>
                        Get Value
                    </Button>
                </div>
            </div>
        );
    }
}

export default TestComponentView;
