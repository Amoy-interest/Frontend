import React from 'react';
import MaterialTable from 'material-table';
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";
import {withStyles} from "@material-ui/styles";
import {getForbidUsers, searchForbidUsers} from "../../../service/AdminService";
import RestoreIcon from '@material-ui/icons/Restore';
import {Link} from "react-router-dom";
import AdminUserUnManageDialog from "../dialogs/AdminUserUnManageDialog";
import Typography from "@material-ui/core/Typography";

const styles = ((theme) => ({
    number: {
        minWidth: 200,
        // marginLeft:'10px',
    },

}));
const tableRef = React.createRef();

@withStyles(styles)
class AdminUnForbidList extends React.Component{
    constructor(props) {
        super(props);
        PubSub.subscribe(MsgType.ADMIN.REFRESH_TABLE, () => this.refresh());
    }

    loadData = query =>
        new Promise((resolve, reject) => {
            let search = (query.search !== "");
            const callback = (res) => {
                console.log(res);
                if (res.status !== 200)
                    PubSub.publish(MsgType.SET_MESSAGE, {
                        text: search? "搜索被封号用户失败！": "获取被封号用户失败！",
                        type: MessageType.ERROR
                    });
                else resolve({
                    data: res.data.list,
                    page: res.data.pageNum,
                    totalCount: res.data.total,
                })
            };

            if (search) {
                searchForbidUsers({
                    keyword: query.search,
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
            else {
                getForbidUsers({
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
        });

    refresh = () => tableRef.current && tableRef.current.onQueryChange();

    render() {
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
                title: '封号结束时间',
                field: 'forbidden_time',
                align: 'left',
                render: rowData => {
                    return (
                        <Typography variant="body2">
                            {new Date(rowData.forbidden_time).Format("yyyy-MM-dd hh:mm:ss")}
                        </Typography>
                    )}
            }
        ];
        const actions = [
            {
                icon: RestoreIcon,
                tooltip: '解除封号',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.UN_FORBID_USR, rowData.user_id)
            },
            {
                icon: 'refresh',
                tooltip: '刷新',
                isFreeAction: true,
                onClick: this.refresh,
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
                actions: "解除封号"
            },
            toolbar: {
                searchTooltip: "搜索",
                searchPlaceholder: "搜索被封号用户..."
            }
        };

        return (
            <div>
                {/*注意，这个标签必须在<MaterialTable>标签旁引用*/}
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <MaterialTable
                    title="用户解封管理"
                    tableRef={tableRef}
                    columns={columns}
                    data={this.loadData}
                    localization={localization}
                    actions={actions}
                    options={options}
                />
                <AdminUserUnManageDialog/>
            </div>

        )
    }

}

export default AdminUnForbidList;
