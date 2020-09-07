import React from 'react';
import ReactDOM from 'react-dom';
import HotSearchItem from "../../../components/hot/HotSearchItem";

describe('actions', () => {
    const item={
        topic_name: "人民币",
        heat: 4586
    }
    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< HotSearchItem style={null} index={1} item={item}/>, div);
    });
})
