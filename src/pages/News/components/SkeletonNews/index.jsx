import React from 'react'
import {
    Box, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

export default function SkeletonNews() {
    const useStyles = makeStyles((theme) => ({
            skeleton_load: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                spacing: '5px',
                flexGrow: 1,
            },
    }))
    const classes = useStyles();
    return (
        <div className={classes.skeleton_load}>

            <Grid item xs>
                <Skeleton variant="rect" width='100%' height={258} />
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="95%" height={80} />
                </Box>
            </Grid>

            <Grid item xs>
                <Skeleton variant="rect" width='100%' height={258} />
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="95%" height={80} />
                </Box>
            </Grid>

            <Grid item xs>
                <Skeleton variant="rect" width='100%' height={258} />
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="95%" height={80} />
                </Box>
            </Grid>

        </div>
    )
}
