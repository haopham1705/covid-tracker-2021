import {
    Button,
    Card,
    CardActionArea,
    LinearProgress,
    CardContent,
    CardMedia,
    Link,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
// import './News.scss'

function News(props) {
    const apiKey = "7530f36a6fcf4ecda75ab4eb1213a9ee";

    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get(
                `http://newsapi.org/v2/everything?domains=who.int&language=en&apiKey=${apiKey}`
            )
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    }, []); 

    const useStyles = makeStyles((theme) => ({
        wrapper: {
            maxWidth: '1200px',
            margin: '0 auto',
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
            maxWidth: 350,
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
                                        <CardMedia
                                            className={classes.media}
                                            image={urlToImage}
                                            title={title}
                                        />
                                        <CardContent>
                                            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                                                {title}
                                            </Typography>
                                            <Typography variant="body2" color="textPrimary" component="h4">
                                                {description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link> 
                            </Card>
                        )
                    })
                    : (<h2 className="msg-not-found">News is loading!</h2>)}
            </div>
        </div>
    );
}

export default News;

// <NewsArticle data={news} key={news.url} />

                        // <div className="news" key={news.url} >
                        //     <h1 className="news__title">{news.title}</h1>
                        //     <p className="news__desc">{news.description}</p>
                        //     <span className="news__author">{news.author}</span> <br />
                        //     <span className="news__published">{news.publishedAt}</span>
                        //     <span className="news__source">{news.source.name}</span>
                        // </div>