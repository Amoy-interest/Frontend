import React from 'react';
import MaterialTable from 'material-table';
import {getReportedTopics, searchReportedTopics} from "../../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";
import DeleteIcon from "@material-ui/icons/Delete";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import AdminTopicDialog from "../dialogs/AdminTopicDialog";
import {Link} from "react-router-dom";

const styles = ((theme) => ({
    name: {
        minWidth: 300,
    },
    time: {
        minWidth: 200,
    },
    text: {
        marginLeft:'10px',
    },

}));

@withStyles(styles)
class AdminTopicList extends React.Component{
    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this);
    }

    loadData = query =>
        new Promise((resolve, reject) => {
            let search = (query.search !== "");
            const callback = (res) => {
                console.log(res);
                if (res.status !== 200)
                    PubSub.publish(MsgType.SET_MESSAGE, {
                        text: search? "搜索话题失败！": "获取话题失败！",
                        type: MessageType.ERROR
                    });
                else resolve({
                    data: res.data.list,
                    page: res.data.pageNum,
                    totalCount: res.data.total,
                })
            };

            if (search) {
                searchReportedTopics({
                    keyword: query.search,
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
            else {
                getReportedTopics({
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
        });

    goto = (topic_name) => {
        console.log(this.props, topic_name);
        this.props.history.push({pathname: '/topic-discussion', state: {topic_name: topic_name}});
    };


    render() {
        const {classes} = this.props;
        const tableRef = React.createRef();
        const columns = [
            {
                title: '话题',
                field: 'name',
                align: 'left',
                render: rowData => {
                    return(
                        // <div className={classes.name}>
                        //     <Typography className={classes.text} noWrap={true} variant={'subtitle1'}
                        //                 onClick={() => {this.goto(rowData.name)}}>
                        //         #{rowData.name}#
                        //     </Typography>
                        // </div>
                        <Link style={{color: '#fff'}} to={{
                            pathname: '/topic-discussion',
                            state:{topic_name: rowData.name}}}>
                            <Typography variant="body1" color="primary" component="p">
                                {`#${rowData.name}#`}
                            </Typography>
                        </Link>
                    )
                }
            },
            {
                title: '创建时间',
                field: 'time',
                align: 'center',
                // type: 'datetime'
                render: rowData => {
                    return (
                        <div className={classes.time}>
                            <Typography variant="body2" component="p">
                                {new Date(rowData.time).Format("yyyy-MM-dd hh:mm:ss")}
                            </Typography>
                        </div>
                    )}
            },
            {
                title: '举报数',
                field: 'report_count',
                align: 'center',
                type:'numeric'
            }
        ];
        const actions = [
            {
                icon: DoubleArrowIcon,
                tooltip: '通过话题',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.PASS_TOPIC, rowData.name)
            },
            {
                icon: DeleteIcon,
                tooltip: '删除话题',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.DELETE_TOPIC, rowData.name)
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
                actions: "话题操作"
            },
            toolbar: {
                searchTooltip: "搜索",
                searchPlaceholder: "搜索话题..."
            }
        };

        return (
            <div>
                {/*注意，这个标签必须在<MaterialTable>标签旁引用*/}
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <MaterialTable
                    tableRef={tableRef}
                    title="话题管理"
                    data={this.loadData}
                    localization={localization}
                    columns={columns}
                    actions={actions}
                    options={options}
                />
                <AdminTopicDialog/>
            </div>
        )
    }
}

export default AdminTopicList;
