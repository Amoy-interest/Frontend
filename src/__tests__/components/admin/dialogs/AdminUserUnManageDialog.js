import React from 'react';
import ReactDOM from "react-dom";
import AdminAddTopicDialog from "../../../../components/admin/dialogs/AdminAddTopicDialog";
import {mount,shallow} from 'enzyme';
import AdminUserUnManageDialog from "../../../../components/admin/dialogs/AdminUserUnManageDialog";

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
        ReactDOM.render(< AdminUserUnManageDialog/>, dialog);
    });

    //call function
    it('calls functions', () => { //在constructor使用bind来定义方法
        const wrapper  = shallow(<AdminUserUnManageDialog/>);
        const spyFunction = jest.spyOn(wrapper.instance(),"cancel");
        wrapper.setState({topic:"hi"});
        //wrapper.instance().confirmAdd();
        wrapper.instance().confirm();
        wrapper.instance().unBan();
        wrapper.instance().unForbid();e
        wrapper.instance().cancel();
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockRestore();
    });
});
