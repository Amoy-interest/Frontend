import ReactDOM from "react-dom";
//import HomePreLoginView from "../views/public/HomePreLoginView";
import React from "react";
import AdminUsersManageView from "../views/admin/AdminUsersManageView";

describe('actions', () => {

    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< AdminUsersManageView/>, div);
    });

});
