import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const html = "fsaf<span style=\"color:#FF5722;\">zzz</span>djsifjdiao";

const style = ((theme) => ({
    container: {
        backgroundColor: '#cfe8fc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    span: {
        color:'#FF5722'
    }
}));

@withStyles(style)
class TestComponentView extends Component{
    constructor(props) {
        super(props);

        this.state = {
            time: null
        };

        this.handleGetState = this.handleGetState.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    setTime(time) {
        this.setState({time: time});
    }

    handleGetState(){
        console.log(this.state);
    }

    handleGetTime(){
        let date = new Date();
        console.log(date);
        console.log(date.toISOString())
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                TestComponentView page!
                <div>
                    {/*<AdminTimePickerForm submit={this.setTime}/>*/}
                    {/*<div dangerouslySetInnerHTML={{__html: html}}/>*/}
                    <Link style={{color: '#fff'}} to={{pathname: '/test-ali'}}>
                        <Typography variant="body1" color="textPrimary"
                                    dangerouslySetInnerHTML={{__html: html}}                                />
                    </Link>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button onClick={this.handleGetState}>handleGetState</button>
                    <button onClick={this.handleGetTime}>handleGetTime</button>
                </div>
            </div>
        );
    }
}

export default TestComponentView;
