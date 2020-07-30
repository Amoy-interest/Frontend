import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {withStyles} from "@material-ui/styles";
import PubSub from "pubsub-js";
import {MsgType} from "../../utils/constants";

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
class Uploader extends Component{
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            images: [],
            limits: (props.limits? props.limits:9)
        };

        this.onChange = this.onChange.bind(this);

    }

    componentWillMount(){
        PubSub.subscribe(MsgType.CLEAR_UPLOAD, () => {
            this.setState({
                files: [],
                images: []
            })
        });
    }

    onChange = async (e) => {
        let newFiles = e.currentTarget.files;
        let total = newFiles.length + this.state.files.length;

        // limit file number
        if (total > this.state.limits){
            PubSub.publish(MsgType.SET_MESSAGE, {
                open: true, text: `图片数量不超过${this.state.limits}张！`,type:'warning'
            });
            return;
        }

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
                {
                    this.state.files.length < this.state.limits ?
                        (<div className="input-file">
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
                            </label>
                        </div>) : null
                }

            </div>
        );
    }
}

export default Uploader;
