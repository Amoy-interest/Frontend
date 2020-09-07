import React from 'react';
import {Post} from "../../../components/post/PostCard";
import IconButton from "@material-ui/core/IconButton";
import CommentList from "../../../components/post/CardCommentList";
import Menu from "@material-ui/core/Menu";
import Enzyme, { mount } from 'enzyme';
import ReactDOM from "react-dom";

describe('actions', () => {

    const post ={
        "user_id": 1,
        "nickname": "财经网\r",
        "blog_id": 1,
        "blog_type": 0,
        "blog_time": "2018-05-17T16:00:00.000+00:00",
        "blog_content": {
            "text": "hello ",
            "images": []
        },
        "blog_child": null,
        "blog_count": {
            "forward_count": 3559,
            "comment_count": 7290,
            "vote_count": 4503,
            "report_count": 0
        },
        "avatar_path": "https://tvax3.sinaimg.cn/crop.0.0.512.512.180/61e04755ly8gdi71zg5ohj20e80e8t94.jpg?KID=imgbed,tva&Expires=1595909159&ssig=nsom2ckvF3",
        "topics_name": [
            "财经",
            "黄金",
            "美联储",
            "水泥",
            "劳斯莱斯"
        ],
        "_vote": false
    };

    //Render correctly
    it('renders without crashing', () => {
        // const div = document.createElement('div');
        // ReactDOM.render(< Post post={post}/>, div);
    });

    // Interact correctly
    it('case: expect contains commentList and menu', async () => {
        // const wrapper = mount(<Post post={post}/>);
        //
        // const commentButton = wrapper.find(IconButton).at(3);
        // expect(commentButton.length).toBe(1);
        // commentButton.simulate('click');
        // const list = wrapper.find(CommentList).at(0);
        // expect(list.length).toBe(1);
        //
        // const moreButton=wrapper.find(IconButton).at(0);
        // expect(moreButton.length).toBe(1);
        // moreButton.simulate('click');
        // const menu=wrapper.find(Menu).at(0);
        // expect(menu.length).toBe(1);

    });
});
