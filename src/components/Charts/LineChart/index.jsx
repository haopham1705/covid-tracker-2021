import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((them) => ({
    btn_days: {
        marginBottom: 10,
    },
}))
const generateOptions = (data) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

    return {
        chart: {
            height: 500,
        },
        title: {
            text: "Total Cases",
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#F3585B'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: "Total Cases",
                data: data.map((item) => item.Confirmed),
            },
        ],
    };
};

export default function LineChart({ data }) {
    const { t } = useTranslation()
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('all');
    console.log({ data });

    useEffect(() => {
        let customData = [];
        switch (reportType) {
            case 'all':
                customData = data;
                break;
            case '30':
                customData = data.slice(Math.max(data.length - 30, 1));
                break;
            case '7':
                customData = data.slice(Math.max(data.length - 7, 1));
                break;
            default:
                customData = data;
                break;
        }

        setOptions(generateOptions(customData));
    }, [data, reportType]);

    const classes = useStyles()
    return (
        <>
            <ButtonGroup
                size='small'
                aria-label='small outlined button group'
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
                className={classes.btn_days}
            >
                <Button
                    color={reportType === 'all' ? 'secondary' : ''}
                    onClick={() => setReportType('all')}
                >
                    {t('content.all')}
                </Button>
                <Button
                    color={reportType === '30' ? 'secondary' : ''}
                    onClick={() => setReportType('30')}
                >
                    30 {t('content.day')}
                </Button>
                <Button
                    color={reportType === '7' ? 'secondary' : ''}
                    onClick={() => setReportType('7')}
                >
                    7 {t('content.day')}
                </Button>
            </ButtonGroup>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </>
    );
}