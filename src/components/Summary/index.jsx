import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

// import { getMapDataByCountryId } from '../apis';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/CountryMaps';
const getMapDataByCountryId = (countryId) =>
    import(
        `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
    );

const useStyles = makeStyles((theme) => ({
    chart_content: {
        display: 'flex',
        flexWrap: 'wrap-reverse',
    },
}))

export default function Summary({ countryId, report }) {
    const [mapData, setMapData] = useState({}); 

    useEffect(() => {
        if (countryId) {
            getMapDataByCountryId(countryId)
                .then((res) => {
                    setMapData(res);
                })
                .catch((err) => console.log({ err }));
        }
    }, [countryId]);
    const classes = useStyles()

    return (
        <>
            <Grid container spacing={2} className={classes.chart_content}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report} />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMaps mapData={mapData} />
                </Grid>
            </Grid>
        </>
    );
}