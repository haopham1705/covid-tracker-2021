import {
    Button,
    ImageList, ImageListItem, ImageListItemBar, Link, useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import newsApi from 'api/newsApi';
import { concat, slice } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SkeletonNews from './components/SkeletonNews'; 

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
    },
    wrapper: {
        maxWidth: '1200px',
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
        },
        color: theme.palette.text.primary,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',
    },
    highlights: {
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        width: '100%',
        maxWidth: 300,
        height: 'auto',

        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
        '&:hover': {
            boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        }
    },
    media: {
        height: 250,
        width: '40%',
        objectFit: 'cover',
        padding: '8px 4px',
    },
    title: {
        color: theme.palette.text.primary,
        fontSize: '1.3rem',
        textAlign: 'left',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '3',
        '&:hover': {
            color: '#1D54A0'
        }
    },
    news_content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'start'
    },
    discription: {
        color: theme.palette.text.primary,
        textAlign: 'left',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '4',
    },
    date_news: {
        width: '100%',
        marginTop: '5px',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'flex-start',
        color: theme.palette.text.primary,
    },
    imageList: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    imgNewsItem: {
        cursor: 'pointer',
    },
    imgHighlights: {
        objectFit: 'cover',
        // '&:hover': {
        //     transform: 'scale(1.2) translateX(-50%)',
        //     transition: 'all 0.5s',
        // }
    },
    listNewsContent: {
        gap: 20,
        marginTop: 30,
        textAlign: 'center',
    },
    listNewsContentItem: {
        width: '60%',
        padding: '2px 8px',
        marign: '3px 0'
    },
    headingTypeNews: {
        fontSize: '2.1rem',
        textAlign: 'left',
        color: theme.palette.text.primary,
        margin: '2rem 5px 8px'
    },
    btnLoadmore: {
        color: theme.palette.text.green,
        background: theme.palette.custom.grey,
        width: '100%',
        border: 0,
        '&:hover': {
            color: theme.palette.secondary.main,
        } 
    } 
}))

const News = React.memo((props) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const LIMIT = 10;

    const [dataNews, setDataNews] = useState();
    const [newsHighlights, setNewsHighlights] = useState();

    const [showMore, setShowMore] = useState(true);
    const [list, setList] = useState()
    const [index, setIndex] = useState(LIMIT);
    console.log(list + 'LIST NEWS')

    const fetchNews = async () => {
        const paramsNewsVN = {
            limit: '300',
            country: 'Vietnam',
        }
        const paramsNewsHighlights = {
            limit: '6',
        }
        // get news Vietnam
        const newsList = await newsApi.getNewsTrending(paramsNewsVN);
        setDataNews(newsList.items);
        setList(slice(newsList.items, 0, LIMIT))

        //get news hightlight global
        const hightlights = await newsApi.getNewsHightlights(paramsNewsHighlights);
        setNewsHighlights(hightlights); 
    };

    useEffect(() => { 
        fetchNews(); 
    }, [])



    const classes = useStyles()
    const LENGTH = 50;

    const loadMoreNews = () => {
        const newIndex = index + LIMIT;
        const newShowMore = newIndex < (LENGTH - 1);
        const newList = concat(list, slice(dataNews, index, newIndex));
        setIndex(newIndex);
        setList(newList);
        setShowMore(newShowMore);
    }

    return (
        <div className={classes.wrapper}>
            <h3 className={classes.headingTypeNews}>{t('content.highlights')}</h3>
            <div className={classes.highlights}>
                <ImageList className={classes.imageList} >

                    {
                        newsHighlights
                            ? newsHighlights.items.map((itemNews) => {
                                const { nid, url, title, description, urlToImage, publishedAt } = itemNews;
                                return (
                                    <ImageListItem key={nid} className={classes.imgNewsItem}>
                                        <img src={urlToImage} alt={title} className={classes.imgHighlights} loading='lazy' />
                                        <Link className={classes.link}>

                                            <ImageListItemBar
                                                title={title}
                                                subtitle={<span className={classes.subtitle}>{description}</span>}
                                            />
                                        </Link>
                                    </ImageListItem>
                                )
                            })
                            :
                            (<SkeletonNews />)
                    }
                </ImageList>
            </div>

            {/* Vietnam News */}
            <h3 className={classes.headingTypeNews}>{t('content.vietnam_news')}</h3>

            <div className={classes.listNewsContent}>
                {list
                    ? list.map((news) => {
                        const { nid, url, title, description, urlToImage, publishedAt } = news;

                        return (

                            <Link className={classes.link} key={nid}>
                                {news ? (
                                    <img
                                        className={classes.media}
                                        src={urlToImage}
                                        alt={title}
                                    />
                                ) : (
                                    <Skeleton variant="rect" width='100%' height={258} />
                                )}
                                <div className={classes.listNewsContentItem}>
                                    <div className={classes.title}  >
                                        {title}
                                    </div>
                                    <div className={classes.discription}>
                                        {description}
                                    </div>
                                    <div className={classes.date_news}>
                                        {publishedAt}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    : (
                        <SkeletonNews />
                    )}
                {showMore && <Button onClick={loadMoreNews} className={classes.btnLoadmore}> Load More </Button>}
            </div>
        </div>
    );
})

export default News;