import React from 'react';
import ReactDOM from "react-dom";
import AdminTopicList from "../../../../components/admin/tables/AdminTopicList";
import {shallow,mount} from 'enzyme';

describe('actions', () => {
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< AdminTopicList/>, div);
    });

    //call function
    // it('calls functions', () => {
    //         const historyMock = {push:jest.fn()};
    //         const wrapper  = mount(<AdminTopicList history={historyMock}/>);
    //         //const spyFunction = jest.spyOn(wrapper.instance(),"goto");
    //         wrapper.instance().goto();
    //         //expect(spyFunction).toHaveBeenCalled();
    //         //spyFunction.mockRestore();
    //     });
});
