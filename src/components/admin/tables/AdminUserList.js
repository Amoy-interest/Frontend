import React from 'react';
import MaterialTable from 'material-table';
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";
import {withStyles} from "@material-ui/styles";
import {getReportedUsers, searchReportedUsers} from "../../../service/AdminService";
import BlockIcon from "@material-ui/icons/Block";
import MicOffIcon from "@material-ui/icons/MicOff";
import {Link} from "react-router-dom";
import AdminForbidUserDialog from "../AdminForbidUserDialog";

const styles = ((theme) => ({
    number: {
        minWidth: 200,
        // marginLeft:'10px',
    },

}));

@withStyles(styles)
class AdminUserList extends React.Component{
    loadData = query =>
        new Promise((resolve, reject) => {
            let search = (query.search !== "");
            const callback = (res) => {
                console.log(res);
                if (res.status !== 200)
                    PubSub.publish(MsgType.SET_MESSAGE, {
                        text: search? "搜索用户失败！": "获取用户失败！",
                        type: MessageType.ERROR
                    });
                else resolve({
                    data: res.data.list,
                    page: res.data.pageNum,
                    totalCount: res.data.total,
                })
            };

            if (search) {
                searchReportedUsers({
                    keyword: query.search,
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
            else {
                getReportedUsers({
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
        });


    render() {
        const tableRef = React.createRef();
        const columns = [
            {
                title: '用户',
                field: 'keyword',
                align: 'left',
                render: (user) => {
                    return (
                        <Link style={{color: 'black'}} to={{
                            pathname: '/personal-info',
                            search: '?id=' + user.user_id,
                        }}>
                            {user.nickname}
                        </Link>
                    )}
            },
            {
                title: '信用值',
                field: 'credits',
                align: 'left',
                type: 'numeric'
            },
            {
                title: '举报原因',
                align: 'left',
                emptyValue: '低俗，暴力，色情'
            },
        ];
        const actions = [
            {
                icon: MicOffIcon,
                tooltip: '禁言',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.BAN_USR, rowData.user_id)
            },
            {
                icon: BlockIcon,
                tooltip: '封号',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.FORBID_USR, rowData.user_id)
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
        const localization = {
            header: {
                actions: "用户操作"
            },
            toolbar: {
                searchTooltip: "搜索",
                searchPlaceholder: "搜索用户..."
            }
        };

        return (
            <div>
                {/*注意，这个标签必须在<MaterialTable>标签旁引用*/}
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <MaterialTable
                    title="用户管理"
                    tableRef={tableRef}
                    columns={columns}
                    data={this.loadData}
                    localization={localization}
                    actions={actions}
                    editable={{onRowUpdate: this.UpdateWord, onRowDelete: this.DeleteWord}}
                    options={options}
                />
                <AdminForbidUserDialog/>
            </div>

        )
    }

}

export default AdminUserList;
