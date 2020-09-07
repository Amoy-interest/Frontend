import React from 'react';
import ReactDOM from "react-dom";
import Carousel from "../../../components/commen/Carousel";

describe('actions', () => {
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< Carousel/>, div);
    });
});
