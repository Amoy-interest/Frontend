import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import OssApi from '../service/OssService'
import 'ali-oss';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/styles";

const styles = ((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    images: {
        width: '80%',
        height: 500,
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

// async function put (client, name, file) {
//     try {
//         let result = await client.put(name, file);
//         console.log(result);
//     } catch (e) {
//         console.log(e);
//     }
// }

const oss = new OssApi();

@withStyles(styles)
class TestAliView extends Component{
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            images: []
        };

        this.changeImg = this.changeImg.bind(this);
    }


    putFile = async () => {
        // put('test0.jpg', this.state.files[0]).then();
        try {
            let files = this.state.files;
            for (let i = 0; i < files.length; ++i){
                console.log(await oss.putObject(files[i]));
            }
        } catch (e) {
            console.log(e);
        }

    };

    changeImg = async () => {
        let images = [];
        for(let i = 0; i < this.state.files.length; i++){
            let result = await getBase64(this.state.files[i]);
            console.log(result);
            images.push(result);
        }

        this.setState({images: images});
    };

    render() {
        const classes = this.props.classes;
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                TestView page!
                <div className={classes.images}>
                    {
                        this.state.images.map((item, value) => {
                            return (
                                <img src={item} key={'img' + value} className={classes.img}/>
                            )
                    })
                    }
                </div>
                {
                    this.state.files.map((item, value) => {
                        return (
                            <Typography key={value} variant="body1" color="textSecondary" component="p">
                                {item.name}
                            </Typography>
                        )
                    })
                }

                <div className="input-file">
                    <input
                        accept="image/*"
                        name='inputFile'
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={async (e) =>{
                            console.log(e.currentTarget.files);
                            this.setState({files: [...this.state.files, ...e.currentTarget.files]});
                            let images = [];
                            for(let i = 0; i < this.state.files.length; i++){
                                let result = await getBase64(this.state.files[i]);
                                // console.log(result);
                                images.push(result);
                            }

                            this.setState({images: images});
                        }}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload
                        </Button>
                    </label>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Button onClick={this.putFile}>putFile</Button>
                    <Button onClick={this.changeImg}>changeImg</Button>
                </div>
            </div>
        );
    }
}

export default TestAliView;
