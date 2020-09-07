import React from 'react';
import ReactDOM from 'react-dom';
import PostCardList from "../../../components/post/PostCardList";
import Posts from "../../../components/post/PostCardList";
import Enzyme, { shallow, render, mount } from 'enzyme';

describe('actions', () => {

    beforeAll(()=>{
        jest.mock('../../../utils/ajax',()=>{
            return{
                get:(url)=>{
                    return new Promise((resolve,reject)=>{
                        if(url) resolve({data:{
                                "data": [],
                                "msg": "uWfj",
                                "status": 94
                            }})
                        else resolve({data:null})
                    })
                }
            }
        })
    });

    //Render correctly
    it('renders without crashing', () => {
        // const div = document.createElement('div');
        // ReactDOM.render(< PostCardList/>, div);
    });

    //Contain certain component
    it('should contain a Post', async ()=> {
        // const wrapper = mount(<PostCardList/>);
        // const post = wrapper.find(Posts).at(0);
        // expect(post.length).toBe(1);
        // console.log(wrapper.state('posts'));
        // expect(wrapper.state('posts')).toBe(null)
    });

    //Spy on componentDidMount
    it('calls componentDidMount', () => {
        // const componentDidMountSpy = jest.spyOn(PostCardList.prototype, 'componentDidMount');
        // const  wrapper= shallow(<PostCardList/>);
        // expect(componentDidMountSpy).toHaveBeenCalled();
        // componentDidMountSpy.mockRestore();
    });

});
