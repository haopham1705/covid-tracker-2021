import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { sortBy } from 'lodash';
import CountrySelector from 'components/CountrySelector';
import { getCountries, getReportByCountry } from 'api/apis';
import Summary from 'components/Summary';
import Highlight from 'components/Highlight';
import { Container, Typography } from '@material-ui/core';
import '@fontsource/roboto';
import { useTranslation } from 'react-i18next';
import moment from 'moment'
import 'moment/locale/vi';

moment.locale('vi');

const TrackerCountry = () => {
    const { t } = useTranslation();
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountries().then((res) => {
            const { data } = res;
            const countries = sortBy(data, 'Country');
            setCountries(countries);
            setSelectedCountryId('vn');
        });
    }, []);

    const handleOnChange = useCallback((e) => {
        setSelectedCountryId(e.target.value);
    }, []);

    useEffect(() => {
        if (selectedCountryId) {
            const selectedCountry = countries.find(
                (country) => country.ISO2 === selectedCountryId.toUpperCase()
            );
            getReportByCountry(selectedCountry.Slug).then((res) => {
                console.log('getReportByCountry', { res });
                // remove last item = current date
                res.data.pop();
                setReport(res.data);
            });
        }
    }, [selectedCountryId, countries]);

    const summary = useMemo(() => {
        if (report && report.length) {
            const latestData = report[report.length - 1];
            return [
                {
                    title: t('content.covid_cases'),
                    count: latestData.Confirmed,
                    type: 'confirmed',
                },
                {
                    title: t('content.covid_recovered'),
                    count: latestData.Recovered,
                    type: 'recovered',
                },
                {
                    title: t('content.covid_death'),
                    count: latestData.Deaths,
                    type: 'death',
                },
            ];
        }
        return [];
    }, [report, t]);

    return (
        <Container style={{ marginTop: 20 }}>
            <Typography variant='h2' component='h2'>
                {t('content.covid_analytics')}
            </Typography>
            <Typography>{moment().format('LLL')}</Typography>
            <CountrySelector
                handleOnChange={handleOnChange}
                countries={countries}
                value={selectedCountryId}
            />
            <Highlight summary={summary} />
            <Summary countryId={selectedCountryId} report={report} />
        </Container>
    );
};

export default TrackerCountry;