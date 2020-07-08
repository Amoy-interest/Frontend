import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

class PersonalInfoView extends Component{

    render() {
        console.log(this.props)
        return (
            <div>
                PersonalInfoView page!
                <Button variant="contained" color="primary">go to home</Button>
            </div>
        );
    }
}

export default PersonalInfoView;
