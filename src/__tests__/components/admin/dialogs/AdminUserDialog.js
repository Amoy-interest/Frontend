import React from 'react';
import ReactDOM from "react-dom";
import AdminAddTopicDialog from "../../../../components/admin/dialogs/AdminAddTopicDialog";
import {mount,shallow} from 'enzyme';
import AdminUserDialog from "../../../../components/admin/dialogs/AdminUserDialog";
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
        ReactDOM.render(< AdminUserDialog/>, dialog);
    });

    //call function
    it('calls functions', () => { //在constructor使用bind来定义方法
        const wrapper  = shallow(<AdminUserDialog/>);
        const values= {time:new Date()};
        const data={user_id:1,time:8000};
        const spyFunction = jest.spyOn(wrapper.instance(),"cancel");
        wrapper.setState({topic:"hi"});

        wrapper.instance().validate(values);
        wrapper.instance().BanUser(data);
        wrapper.instance().ForbidUser(data);
        wrapper.instance().confirm(values);
        wrapper.instance().cancel();
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockRestore();
    });
});
