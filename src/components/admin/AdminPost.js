import React from 'react';
import MaterialTable from 'material-table';
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../utils/constants";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import {getReportedPosts, searchReportedPosts} from "../../service/AdminService";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import PostCard from "../post/PostCard";
import {Link} from "react-router-dom";

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

@withStyles(styles)
class AdminPost extends React.Component{
    loadData = query =>
        new Promise((resolve, reject) => {
            let search = (query.search !== "");
            const callback = (res) => {
                console.log(res);
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

    BanPost() {
        console.log('BanPost');
    }

    ForbidPost() {
        console.log('ForbidPost');
    }


    render() {
        const {classes} = this.props;
        const tableRef = React.createRef();
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
                    <Typography variant="body2" noWrap={true} component="p">
                        {blog.blog_content.text}
                    </Typography>
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
                onClick: (event, rowData) => alert("通过 " + rowData.blog_content.text)
            },
            {
                icon: DeleteIcon,
                tooltip: '删除',
                onClick: (event, rowData) => alert("删除 " + rowData.blog_content.text)
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
        const detailPanel = [
            {
                tooltip: '博文详情',
                render: blog => {
                    return (
                        <div className={classes.postcard}>
                            <PostCard post={blog}
                                      index={0}
                                      handleBan={this.BanPost}
                                      handleForbid={this.ForbidPost}
                            />
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
                    title="用户管理"
                    tableRef={tableRef}
                    columns={columns}
                    data={this.loadData}
                    localization={{header: {actions: "用户操作"}}}
                    actions={actions}
                    editable={{onRowUpdate: this.UpdateWord, onRowDelete: this.DeleteWord,}}
                    options={options}
                    detailPanel={detailPanel}
                />
            </div>

        )
    }

}

export default AdminPost;
