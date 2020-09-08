import React from 'react';
import ReactDOM from "react-dom";
import AdminUnBanList from "../../../../components/admin/tables/AdminUnBanList";

describe('actions', () => {
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< AdminUnBanList/>, div);
    });

});
