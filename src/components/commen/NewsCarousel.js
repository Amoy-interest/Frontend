import React from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import ReactSwiper from 'reactjs-swiper';
import TravelImage from '../../assets/travel.png';
import ChildrenImage from '../../assets/children.png';
import AnimalImage from '../../assets/animal.png';
import FunImage from '../../assets/fun.png';
import YummyImage from '../../assets/yummy.png';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     details: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     content: {
//         flex: '1 0 auto',
//     },
//     cover: {
//         width: '100%',
//     },
// }));

export default function NewsCarousel() {
    // const classes = useStyles();
    // const theme = useTheme();
        const items = [{
            image: FunImage,
            title: '娱乐',
            link: 'https://github.com/Amoy-interest'
        }, {
            image: ChildrenImage,
            title: '自然',
            link:'https://github.com/Amoy-interest'
        }, {
            image: AnimalImage,
            title: '动物',
            link: 'https://github.com/Amoy-interest'
        }, {
            image: YummyImage,
            title: '美食',
            link: 'https://github.com/Amoy-interest'
        },{
            image: TravelImage,
            title: '旅行',
            link: 'https://github.com/Amoy-interest'
        }
        ];

        const swiperOptions = {
            preloadImages: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false
        };
        return (
            <ReactSwiper swiperOptions={swiperOptions} showPagination items={items}
                         className="swiper-example" />
        );

}
