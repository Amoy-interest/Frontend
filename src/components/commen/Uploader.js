import React from 'react';
import {Upload, Dialog, Button} from 'element-react'
import 'element-theme-default'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class Uploader extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            dialogImageUrl: '',
            dialogVisible: false,
            // fileList: [],
            limits: props.limits? props.limits: 3,
            uploaderDisabled: false,
        };

        // this.handleClick = this.handleClick.bind(this);
    }

    handleRemove(file, fileList) {
        console.log(file, fileList);
    }

    handlePictureCardPreview(file) {
        this.setState({
            dialogImageUrl: file.url,
            dialogVisible: true,
        })
    }

    onChange = async (file, fileList) => {
        for (let i = 0; i < fileList.length; ++i) {
            fileList[i].base64 = await getBase64(fileList[i].raw);
        }
        this.props.uploadFiles(fileList);

        if (fileList.length >= this.state.limits)
            this.setState({uploaderDisabled: true});
        else this.setState({uploaderDisabled: false});

        console.log(this.state);
    };

    // handleClick = () => {
    //     console.log(this.state.uploaderDisabled);
    // };

    render() {
        const { dialogImageUrl, dialogVisible } = this.state;
        return (
            <div>
                <Upload
                    style={{height: 20}}
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    multiple
                    disabled={this.state.uploaderDisabled}
                    onChange={this.onChange}
                    onPreview={file => this.handlePictureCardPreview(file)}
                    onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                >
                    <i className="el-icon-plus"/>
                </Upload>
                <Dialog
                    visible={dialogVisible}
                    size="tiny"
                    onCancel={() => this.setState({ dialogVisible: false })}
                >
                    <img width="100%" src={dialogImageUrl} alt="" />
                </Dialog>
                {/*<Button onClick={this.handleClick}>get base64</Button>*/}
            </div>
        )
    }
}























// import { Upload, Modal } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
//
// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }
//
// export default class Uploader extends React.Component {
//     state = {
//         previewVisible: false,
//         previewImage: '',
//         previewTitle: '',
//         fileList: [
//             {
//                 uid: '-1',
//                 name: 'image.png',
//                 status: 'done',
//                 url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             },
//             {
//                 uid: '-2',
//                 name: 'image.png',
//                 status: 'done',
//                 url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             },
//             {
//                 uid: '-3',
//                 name: 'image.png',
//                 status: 'error',
//             },
//         ],
//     };
//
//     handleCancel = () => this.setState({ previewVisible: false });
//
//     handlePreview = async file => {
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj);
//         }
//
//         this.setState({
//             previewImage: file.url || file.preview,
//             previewVisible: true,
//             previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
//         });
//     };
//
//     handleChange = ({ fileList }) => this.setState({ fileList });
//
//     render() {
//         const { previewVisible, previewImage, fileList, previewTitle } = this.state;
//         const uploadButton = (
//             <div>
//                 <PlusOutlined />
//                 <div className="ant-upload-text">Upload</div>
//             </div>
//         );
//
//         return (
//             <div className="clearfix">
//                 <Upload
//                     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                     listType="picture-card"
//                     fileList={fileList}
//                     onPreview={this.handlePreview}
//                     onChange={this.handleChange}
//                 >
//                     {fileList.length >= 8 ? null : uploadButton}
//                 </Upload>
//                 <Modal
//                     visible={previewVisible}
//                     title={previewTitle}
//                     footer={null}
//                     onCancel={this.handleCancel}
//                 >
//                     <img alt="example" style={{ width: 100 }} src={previewImage} />
//                 </Modal>
//             </div>
//         );
//     }
// }
//
