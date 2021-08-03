import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import SearchBox from 'components/SearchBox';
import { ArrowDropDown } from '@material-ui/icons';
import classNames from 'classnames';


// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
    chart: {
        height: '500',
    },
    title: {
        text: null,
    },
    mapNavigation: {
        enabled: true,
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '	#7A0826'],
        ],
    },
    legend: {
        layout: 'horizontal',
        align: 'center',
        horizontalAlign: 'bottom',
    },
    series: [
        {
            name: 'Cases',
            joinBy: ['hc-key', 'key'],
        },
    ],
};


const CountryMaps = ({ mapData }) => {
    const [options, setOptions] = useState({});
    const [casesNum, setCasesNum] = useState();
    const [mapLoaded, setMapLoaded] = useState(false);
    const chartRef = useRef(null);

    // const useStyles = makeStyles((theme) => ({
    //     btn: {
    //         marginTop: '10px',
    //     }
    // }));
    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            console.log({ mapData });
            const fakeData = mapData.features.map((feature, index) => ({
                key: feature.properties['hc-key'],
                value: index,
            }));

            setOptions(() => ({
                ...initOptions,
                title: {
                    text: mapData.title,
                },
                series: [
                    { ...initOptions.series[0], mapData: mapData, data: fakeData },
                ],
            }));

            if (!mapLoaded) setMapLoaded(true);
        }
    }, [mapData, mapLoaded]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            });
        }
    }, [options, mapData]);

    if (!mapLoaded) return null;

    return (
        <>
            <ButtonGroup style={{ marginBottom: '5px' }} variant="contained" color="primary" aria-label="split button">
                <Button></Button>
                <Button
                    color="primary"
                    size="small"
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                >
                    <ArrowDropDown />
                </Button>
            </ButtonGroup>
            <HighchartsReact
                highcharts={Highcharts}
                options={cloneDeep(options)}
                constructorType={'mapChart'}
                ref={chartRef}
            />
        </>
    );
};

CountryMaps.defaultProps = {
    mapData: {},
};

export default React.memo(CountryMaps);