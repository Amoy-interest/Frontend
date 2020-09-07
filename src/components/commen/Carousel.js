import React from 'react';
import {Carousel} from 'element-react';
import 'element-theme-default';
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ChildrenImage from '../../assets/img/carousel/children.png';
import AnimalImage from '../../assets/img/carousel/animal.png';
import FunImage from '../../assets/img/carousel/fun.png';
import YummyImage from '../../assets/img/carousel/yummy.png';
import NewsImage from '../../assets/img/carousel/news.png';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ((theme) => ({
    root: {
        width: '95%',
        marginLeft:'2.5%'
    },
    image:{
        width: '100%',
        height:'350px'
    },
    title: {
        color: '#000'
        //theme.palette.primary.light,
    },
    titleBar: {
        opacity:'70%',
        height: '60px',
        background:
            'linear-gradient(to top, rgba(105,105,105,0.7) 0%, rgba(190,190,190,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const items = [
    {
        image: NewsImage,
        title: '二十四节气:立秋',
        link: 'https://github.com/Amoy-interest'
    },
    {
        image: FunImage,
        title: '娱乐',
        link: 'https://github.com/Amoy-interest'
    },
    {
        image: ChildrenImage,
        title: '自然',
        link:'https://github.com/Amoy-interest'
    },
    {
        image: AnimalImage,
        title: '动物',
        link: 'https://github.com/Amoy-interest'
    },
    {
        image: YummyImage,
        title: '美食',
        link: 'https://github.com/Amoy-interest'
    }
];

@withStyles(styles)
class NewsCarousel extends React.Component{
    render() {
        const {classes}=this.props;
        return (
            <div className={classes.root}>
                <Carousel indicatorPosition="outside"type="card" height="350px" >
                    {
                        items.map((item, index) => {
                            return (
                                <Carousel.Item key={index}  className={classes.item}>
                                    <img alt='' src={item.image}  className={classes.image}/>
                                    <GridListTileBar
                                        title={`#${item.title}#`}
                                        //titlePosition="top"
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                        actionPosition="left"
                                        subtitle={<span>{item.author}</span>}
                                        actionIcon={
                                            <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                                <StarBorderIcon/>
                                            </IconButton>
                                        }
                                    />
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </div>
        );
    }

}
export default NewsCarousel;
