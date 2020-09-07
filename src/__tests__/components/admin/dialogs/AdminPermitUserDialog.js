import React from 'react';
import ReactDOM from "react-dom";
import AdminAddTopicDialog from "../../../../components/admin/dialogs/AdminAddTopicDialog";
import {mount,shallow} from 'enzyme';
import AdminPermitUserDialog from "../../../../components/admin/dialogs/AdminPermitUserDialog";

describe('actions', () => {
    beforeAll(()=>{
        jest.mock('../../../../utils/ajax',()=>{
            return{
                post:(url)=>{
                    return new Promise((resolve,reject)=>{
                        if(url) resolve({data:{
                                "status": 200,
                                "msg": "成功！",
                                "data": {}}})
                        else resolve({data:null})
                    })
                }
            }
        })
    });
    //Render correctly
    it('renders without crashing', () => {
        const dialog = document.createElement('Dialog');
        ReactDOM.render(< AdminPermitUserDialog/>, dialog);
    });

    //call function
    it('calls functions', () => { //在constructor使用bind来定义方法
        const data={user_id:1,time:8000};
        const values= {time:new Date()};
        const wrapper  = shallow(<AdminPermitUserDialog/>);
        const spyFunction = jest.spyOn(wrapper.instance(),"cancel");
        wrapper.setState({topic:"hi"});
        //wrapper.instance().confirm();
        wrapper.instance().unBanUser(data);
        wrapper.instance().permitUser(data);
        wrapper.instance().confirm(values);
        wrapper.instance().cancel();
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockRestore();
    });
});
