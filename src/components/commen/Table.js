import MaterialTable from 'material-table';
import React from "react";
import {getReportedTopics} from "../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../utils/constants";
import {withStyles} from "@material-ui/styles";

const styles = ((theme) => ({
    name: {
        minWidth: 300,
        // marginLeft:'10px',
    },
    time: {
        minWidth: 200,
        // marginLeft:'10px',
    },
    button: {
        maxWidth: 20,
        marginRight:'10px',
    },
    text: {
        // width: 90,
        marginLeft:'10px',
    },

}));

@withStyles(styles)
class PositioningActionsColumn extends React.Component{
    loadData = query =>
        new Promise((resolve, reject) => {
            const params = {
                pageNum: query.page,
                pageSize: query.pageSize
            };
            getReportedTopics(params, ((res) => {
                if (res.status !== 200) PubSub.publish(MsgType.SET_MESSAGE, {
                    text: "获取话题失败！", type: MessageType.ERROR});
                else resolve({
                    data: res.data.list,
                    page: res.data.pageNum,
                    totalCount: res.data.total,
                })
            }));
        });

    render() {
        const tableRef = React.createRef();
        const options = {
            actionsColumnIndex: -1,
            // selection: true,
            // selectionProps: rowData => ({
            //     color: 'primary'
            // })
        };
        return (
            <MaterialTable
                tableRef={tableRef}
                title="Positioning Actions Column Preview"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    {
                        title: 'Birth Place',
                        field: 'birthCity',
                        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                    },
                ]}
                data={this.loadData}
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                    },
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                        disabled: rowData.birthYear < 2000
                    })
                ]}
                options={options}
            />
        )
    }


}

export default PositioningActionsColumn;
