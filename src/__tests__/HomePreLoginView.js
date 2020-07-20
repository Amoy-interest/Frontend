import ReactDOM from "react-dom";
import React from "react";
import HomePreLoginView from "../views/public/HomePreLoginView";

describe('actions', () => {

    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< HomePreLoginView/>, div);
    });

});
