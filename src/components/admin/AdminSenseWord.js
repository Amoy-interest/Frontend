import React from 'react';
import MaterialTable from 'material-table';
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../utils/constants";
import {getSensWords, searchSensWords} from "../../service/KeyWordService";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";

const styles = ((theme) => ({
    number: {
        minWidth: 200,
        // marginLeft:'10px',
    },

}));

@withStyles(styles)
class AdminSenseWord extends React.Component{
    loadData = query =>
        new Promise((resolve, reject) => {
            let search = (query.search !== "");
            const callback = (res) => {
                console.log(res);
                if (res.status !== 200)
                    PubSub.publish(MsgType.SET_MESSAGE, {
                        text: search? "搜索敏感词失败！": "获取敏感词失败！",
                        type: MessageType.ERROR
                    });
                else resolve({
                    data: res.data.list,
                    page: res.data.pageNum,
                    totalCount: res.data.total,
                })
            };

            if (search) {
                searchSensWords({
                    keyword: query.search,
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
            else {
                getSensWords({
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
        });

    AddWord = (newData) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                });
            }, 600);
        });

    UpdateWord = (newData, oldData) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                if (oldData) {
                    this.setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                    });
                }
            }, 600);
        });

    DeleteWord = (oldData) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                });
            }, 600);
        });



    render() {
        const {classes} = this.props;
        const tableRef = React.createRef();
        const columns = [
            {
                title: '敏感词',
                field: 'keyword'
            },
            {
                title: '敏感博文数量',
                render: () => {
                    return (
                        <div className={classes.number}>
                            <Typography variant="body1" color="textSecondary" component="p">
                                100
                            </Typography>
                        </div>
                    )}},
        ];
        const actions = [
            {
                icon: 'add',
                tooltip: '添加敏感词',
                isFreeAction: true,
                onClick: (event) => alert("You want to add a new row")
            },
            {
                icon: 'refresh',
                tooltip: '刷新',
                isFreeAction: true,
                onClick: () => tableRef.current && tableRef.current.onQueryChange(),
            }
        ];
        const options = {
            actionsColumnIndex: -1,
            sorting: false,
            pageSize: 8,
            pageSizeOptions: [5, 8, 10, 15, 20]
        };

        return (
            <div>
                {/*注意，这个标签必须在<MaterialTable>标签旁引用*/}
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <MaterialTable
                    title="敏感词管理"
                    tableRef={tableRef}
                    columns={columns}
                    data={this.loadData}
                    localization={{header: {actions: "敏感词操作"}}}
                    actions={actions}
                    editable={{onRowUpdate: this.UpdateWord, onRowDelete: this.DeleteWord,}}
                    options={options}
                />
            </div>

        )
    }

}

export default AdminSenseWord;
