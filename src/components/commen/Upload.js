import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';import {withStyles} from "@material-ui/styles";
import PostImage from "../post/PostImage";

const styles = ((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    input: {
        display: 'none',
    },
    imageContainer: {
        maxWidth: '80%',
        maxHeight: 100,
        backgroundColor: '#cfe8fc'
    },
    img: {
        width: 100,
        height: 100,
    }
}));

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


@withStyles(styles)
class Upload extends Component{
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            images: [],
            limits: 4
        };

        this.onChange = this.onChange.bind(this);

    }

    onChange = async (e) => {
        let newFiles = e.currentTarget.files;
        let allFiles = [...this.state.files, ...newFiles];
        let images = this.state.images;
        for(let i = 0; i < newFiles.length; i++){
            let result = await getBase64(newFiles[i]);
            images.push(result);
        }

        this.setState({
            files: allFiles,
            images: images
        });

        this.props.uploadFiles(allFiles, images);
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <div className="input-file">
                    <input
                        accept="image/*"
                        name='inputFile'
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={this.onChange}
                    />
                    <label htmlFor="contained-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                        {/*<Button variant="contained" color="primary" component="span">*/}
                        {/*    Upload*/}
                        {/*</Button>*/}
                    </label>
                </div>
            </div>
        );
    }
}

export default Upload;
