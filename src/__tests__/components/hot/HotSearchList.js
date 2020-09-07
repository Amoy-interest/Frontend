import React from 'react';
import ReactDOM from 'react-dom';
import HotSearchList from "../../../components/hot/HotSearchList";

describe('actions', () => {

    beforeAll(()=>{
        jest.mock('../../../utils/ajax',()=>{
            return{
                get:(url)=>{
                    return new Promise((resolve,reject)=>{
                        if(url) resolve({data:{
                                "status": 200,
                                "msg": "成功！",
                                "data": {
                                    "pageNum": 0,
                                    "pageSize": 1,
                                    "totalPage": 50,
                                    "total": 50,
                                    "list": [
                                        {
                                            "topic_name": "人民币",
                                            "heat": 4586
                                        }
                                    ]
                                }
                            }})
                        else resolve({data:null})
                    })
                }
            }
        })
    });

    //Render correctly
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(< HotSearchList/>, div);
    });
})
