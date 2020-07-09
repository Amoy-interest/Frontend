import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ReactSwiper from 'reactjs-swiper';
import TravelImage from '../assets/travel.png';
import ChildrenImage from '../assets/children.png';
import AnimalImage from '../assets/animal.png';
import FunImage from  '../assets/fun.png';
import YummyImage from '../assets/yummy.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '100%',
    },
}));

export default function NewsCarousel() {
    const classes = useStyles();
    const theme = useTheme();
        const items = [{
            image: FunImage,
            title: '娱乐',
            link: 'http://jd.com'
        }, {
            image: ChildrenImage,
            title: '自然',
            link:'http://jd.com'
        }, {
            image: AnimalImage,
            title: '动物',
            link: 'http://jd.com'
        }, {
            image: YummyImage,
            title: '美食',
            link: 'http://jd.com'
        },{
            image: TravelImage,
            title: '旅行',
            link: 'http://jd.com'
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
// <img className={classes.cover} src={TravelImage} alt={'旅行'} />
