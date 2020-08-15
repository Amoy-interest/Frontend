import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";


const style = ((theme) => ({
    container: {
        backgroundColor: '#cfe8fc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
            <div style={classes.container}>
                TestComponentView page!

            </div>
        );
    }
}

export default TestComponentView;
