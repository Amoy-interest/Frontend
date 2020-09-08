import React from 'react';
import ReactDOM from "react-dom";
import AdminUserList from "../../../../components/admin/tables/AdminUserList";

describe('actions', () => {
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< AdminUserList/>, div);
    });
});
