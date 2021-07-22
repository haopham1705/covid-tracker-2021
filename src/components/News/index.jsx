import {
    Button,
    Card,
    CardActionArea,
    LinearProgress,
    CardContent,
    CardMedia,
    Link,
    Typography,
    Container,
    Box
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import newsApi from 'api/newsApi'
// import './News.scss'

function News(props) { 

    const [data, setData] = useState();

    useEffect(() => { 
        const fetchNews = async () => {
            const params = {
                qinTitle: 'covid19',
                from: '2021-07-01',
                apiKey: '7530f36a6fcf4ecda75ab4eb1213a9ee',
            }
                const productList = await newsApi.getNewsPoplularity(params);
            setData(productList);
            console.log(data)
        };
        fetchNews();
    }, [])

    const useStyles = makeStyles((theme) => ({
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
            marginBottom: '5px',
            cursor: 'pointer',
            alignItems: 'center',
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
        skeleton_load: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',

        }
    }))

    const classes = useStyles()

    return (
        <div>
            <div className={classes.wrapper}>
                {data
                    ? data.articles.map((news) => {
                        const { url, title, description, urlToImage } = news;

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
                                            <CardContent>
                                                <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                                                    {title}
                                                </Typography>
                                                <Typography variant="body2" color="textPrimary" component="h4">
                                                    {description}
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
                        <>
                            <Card className={classes.card} > 
                                    <CardActionArea>
                                        <Skeleton variant="rect" width='100%' height={258} />
                                        <Box pt={0.5}>
                                            <Skeleton />
                                            <Skeleton width="95%" height={80} />
                                        </Box>
                                    </CardActionArea> 
                            </Card>
                        </>
                        // <h2 className="msg-not-found">Loading..</h2>
                    )}
            </div>
        </div>
    );
}

export default News; 