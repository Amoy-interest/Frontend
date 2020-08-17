import React from 'react';
import MaterialTable from 'material-table';
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";
import {getSensWords, searchSensWords} from "../../../service/KeyWordService";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import AdminAddWordsDialog from "../dialogs/AdminAddWordsDialog";
import AdminDeleteWordsDialog from "../dialogs/AdminDeleteWordsDialog";
import AdminEditWordsDialog from "../dialogs/AdminEditWordsDialog";

const styles = ((theme) => ({
    number: {
        minWidth: 200,
    },

}));
const tableRef = React.createRef();

@withStyles(styles)
class AdminSenseWordList extends React.Component{
    constructor(props) {
        super(props);
        PubSub.subscribe(MsgType.ADMIN.REFRESH_TABLE, () => this.refresh());
    }

    loadData = query =>
        new Promise((resolve, reject) => {
            let search = (query.search !== "");
            const callback = (res) => {
                // console.log(res);
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

    refresh = () => tableRef.current && tableRef.current.onQueryChange();

    render() {
        const {classes} = this.props;
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
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.ADD_SENSE_WORD, rowData.keyword)
            },
            {
                icon: 'refresh',
                tooltip: '刷新',
                isFreeAction: true,
                onClick: this.refresh,
            },
            {
                icon: 'delete',
                tooltip: '删除敏感词',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.DELETE_SENSE_WORD, rowData.keyword)
            },
            {
                icon: 'edit',
                tooltip: '编辑敏感词',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.EDIT_SENSE_WORD, rowData.keyword)
            }
        ];
        const options = {
            actionsColumnIndex: -1,
            sorting: false,
            pageSize: 8,
            pageSizeOptions: [5, 8, 10, 15, 20]
        };
        const localization = {
            header: {
                actions: "敏感词操作"
            },
            toolbar: {
                searchTooltip: "搜索",
                searchPlaceholder: "搜索敏感词..."
            }
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
                    localization={localization}
                    actions={actions}
                    // editable={{onRowUpdate: this.UpdateWord, onRowDelete: this.DeleteWord,}}
                    options={options}
                />
                <AdminAddWordsDialog/>
                <AdminDeleteWordsDialog/>
                <AdminEditWordsDialog/>
            </div>

        )
    }

}

export default AdminSenseWordList;
