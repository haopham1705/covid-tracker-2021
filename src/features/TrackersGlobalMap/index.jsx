import React, { useState, useEffect } from "react";
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
    TextField
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from "./components/util";
import numeral from "numeral";
import Map from "./components/Map";
import { Trans, useTranslation } from 'react-i18next';
import "leaflet/dist/leaflet.css";
import './Trackers.scss'


function TrackersGlobalMap() {
    const {t} = useTranslation()
    const [country, setInputCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [countries, setCountries] = useState([]);
    const [mapCountries, setMapCountries] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                        flag: country.countryInfo.flag,
                    }));
                    let sortedData = sortData(data);
                    setCountries(countries);
                    setMapCountries(data);
                    setTableData(sortedData);
                });
        };

        getCountriesData();
    }, []);
 

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;

        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setInputCountry(countryCode);
                setCountryInfo(data);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    return (
        <div className="tracker-content">
            <div className="tracker-content__left">
                <div className="tracker-content__header">
                    <h1>{t('content.tracking_covid')}</h1>
                    <FormControl className="tracker-content__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={onCountryChange}
                        >
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {countries.map((country) => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ width: 300 }}>
                    {/* <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        // options={top100Films.map((option) => option.title)}
                        // renderInput={(params) => (
                        //     <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
                        // )}
                    /> */}
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={countries.map((country) => country.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                    />
                </div>
                <div className="tracker-content__stats">
                    <InfoBox
                        onClick={(e) => setCasesType("cases")}
                        title={t('content.covid_cases')}
                        isRed
                        active={casesType === "cases"}
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        total={numeral(countryInfo.cases).format("0.0a")}
                    />
                    <InfoBox
                        onClick={(e) => setCasesType("recovered")}
                        title={t('content.covid_recovered')}
                        active={casesType === "recovered"}
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={numeral(countryInfo.recovered).format("0.0a")}
                    />
                    <InfoBox
                        onClick={(e) => setCasesType("deaths")}
                        title={t('content.covid_death')}
                        isRed
                        active={casesType === "deaths"}
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={numeral(countryInfo.deaths).format("0.0a")}
                    />
                </div>
                <Map
                    countries={mapCountries}
                    casesType={casesType}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>
            <Card className="tracker-content__right">
                <CardContent>
                    <div className="tracker-content__information">
                        <h3>{t('content.live_case_country')}</h3>
                        <Table countries={tableData} />
                        <h3>{t('content.world_wide_case')} {casesType}</h3>
                        <LineGraph casesType={casesType} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TrackersGlobalMap;
