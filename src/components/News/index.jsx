import {
    Box, Card,
    CardActionArea, CardContent,
    CardMedia, Grid, Link,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import SkeletonNews from './components/SkeletonNews';
import newsApi from 'api/newsApi';
import React, { useEffect, useState } from 'react'; 

function News(props) {

    const [dataNews, setDataNews] = useState();

    useEffect(() => { 
        const fetchNews = async () => {
            const params = {
                limit: '100',
                country: 'Vietnam',
            }
            const newsList = await newsApi.getNewsTrending(params);
            setDataNews(newsList);
            console.log(dataNews)
        };
        fetchNews();
    }, [])
    console.log('news data '+dataNews)
    
    const useStyles = makeStyles((theme) => ({
        root: { 
        },
        wrapper: {
            maxWidth: '1200px',
            paddingTop: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 20
        },
        link: {
            width: '100%',
            textAlign: 'center',
            '&:hover': {
                textDecoration: 'none',
            }
        },
        card: {
            width: '100%',
            maxWidth: 300,
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom: '3px  5px',
            cursor: 'pointer', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
            transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
            '&:hover': {
                boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
            }
        },
        media: {
            height: 250,
        },
        title: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#000',
            textAlign: 'center'
        },
        button: {
            background: 'linear-gradient(45deg, #2979ff 30%, #5a93f6 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 30,
            padding: '0 30px',
        },
        news_content: { 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignContent: 'start'
        },
        discription: {
            color: 'var(--text-color)',
            textAlign: 'left',
        },
        date_news: {
            width: '100%',
            marginTop: '5px',
            fontSize: '0.8rem',
            display: 'flex',
            justifyContent: 'flex-end',
            color: 'var(--grey-color)'
        }
    }))

    const classes = useStyles()

    return (
        <div>
            <div className={classes.wrapper}>
                {dataNews
                    ? dataNews.items.map((news) => {
                        const { url, title, description, urlToImage, publishedAt } = news;

                        return (
                            <Card className={classes.card} key={url}>
                                <Link className={classes.link} href={url}>
                                    <CardActionArea>
                                        {news ? (
                                            <CardMedia
                                                className={classes.media}
                                                image={urlToImage}
                                                title={title}
                                            />
                                        ) : (
                                            <Skeleton variant="rect" width='100%' height={258} />
                                        )}
                                        {news ? (
                                            <CardContent className={classes.news_content}>
                                                <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                                                    {title}
                                                </Typography>
                                                <Typography variant="body2" color="textPrimary" component="h5" className={classes.discription}>
                                                    {description}
                                                </Typography>
                                                <Typography variant="p" color="textPrimary" component="p" className={classes.date_news}>
                                                     {publishedAt} 
                                                </Typography>
                                                
                                            </CardContent>
                                        ) : (
                                            <Box pt={0.5}>
                                                <Skeleton />
                                                <Skeleton width="95%" height={80} />
                                            </Box>
                                        )}
                                    </CardActionArea>
                                </Link>
                            </Card>
                        )
                    })
                    : ( 
                        <SkeletonNews/> 
                    )}
            </div>
        </div>
    );
}

export default News; 