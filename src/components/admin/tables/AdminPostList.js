import React from 'react';
import MaterialTable from 'material-table';
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import {getReportedPosts, searchReportedPosts} from "../../../service/AdminService";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import PostCard from "../../post/PostCard";
import {Link} from "react-router-dom";
import AdminPostDialog from "../dialogs/AdminPostDialog";
import AdminUserDialog from "../dialogs/AdminUserDialog";

const styles = ((theme) => ({
    postcard: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        height: 500,
        overflow:'auto'
    }

}));
const tableRef = React.createRef();

@withStyles(styles)
class AdminPostList extends React.Component{
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
                        text: search? "搜索博文失败！": "获取博文失败！",
                        type: MessageType.ERROR
                    });
                else resolve({
                    data: res.data.list,
                    page: res.data.pageNum,
                    totalCount: res.data.total,
                })
            };

            if (search) {
                searchReportedPosts({
                    keyword: query.search,
                    pageNum: query.page,
                    pageSize: query.pageSize
                }, callback);
            }
            else {
                getReportedPosts({
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
                title: '发帖人',
                field: 'nickname',
                render: blog => {
                    return (
                        <Link style={{color: 'black'}} to={{
                            pathname: '/personal-info',
                            search: '?id=' + blog.user_id,
                        }}>
                            {blog.nickname}
                        </Link>
                    )
                }
            },
            {
                title: '博文内容',
                field: 'blog_content.text',
                align: 'left',
                render: blog => (
                    <div style={{maxWidth: 300}}>
                        <Typography variant="body2" noWrap={true}>
                            {blog.blog_content.text}
                        </Typography>
                    </div>

                )
            },
            {
                title: '热度',
                align: 'right',
                render: blog => (
                    <Typography variant="body1" noWrap={true} component="p">
                        {blog.blog_count.forward_count + blog.blog_count.comment_count + blog.blog_count.vote_count}
                    </Typography>
                )
            },
            {
                title: '举报数',
                align: 'center',
                field: 'blog_count.report_count',
            }
        ];
        const actions = [
            {
                icon: DoubleArrowIcon,
                tooltip: '通过',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.PASS_POST, rowData.blog_id)
            },
            {
                icon: DeleteIcon,
                tooltip: '删除',
                onClick: (event, rowData) => PubSub.publish(MsgType.ADMIN.DELETE_POST, rowData.blog_id)
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
                actions: "博文操作"
            },
            toolbar: {
                searchTooltip: "搜索",
                searchPlaceholder: "搜索博文..."
            }
        };
        const detailPanel = [
            {
                tooltip: '博文详情',
                render: blog => {
                    return (
                        <div className={classes.postcard}>
                            <PostCard post={blog} index={0}/>
                        </div>
                    )
                }
            }
        ];

        return (
            <div>
                {/*注意，这个标签必须在<MaterialTable>标签旁引用*/}
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <MaterialTable
                    title="博文管理"
                    tableRef={tableRef}
                    columns={columns}
                    data={this.loadData}
                    localization={localization}
                    actions={actions}
                    options={options}
                    detailPanel={detailPanel}
                />
                <AdminPostDialog/>
                <AdminUserDialog/>
            </div>

        )
    }

}

export default AdminPostList;
