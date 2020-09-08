import React from 'react';
import ReactDOM from "react-dom";
import AdminAddTopicDialog from "../../../../components/admin/dialogs/AdminAddTopicDialog";
import {mount,shallow} from 'enzyme';
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
        ReactDOM.render(< AdminAddTopicDialog/>, dialog);
    });

});
