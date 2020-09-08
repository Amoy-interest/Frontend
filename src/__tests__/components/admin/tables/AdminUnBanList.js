import React from 'react';
import ReactDOM from "react-dom";
import AdminUnForbidList from "../../../../components/admin/tables/AdminUnForbidList";

describe('actions', () => {
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< AdminUnForbidList/>, div);
    });
});
