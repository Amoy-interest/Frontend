import ReactDOM from "react-dom";
import {Search} from "../../../components/commen/SearchBar";
import React from "react";

describe('actions', () => {
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< Search/>, div);
    });
});
