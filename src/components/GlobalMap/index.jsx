import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { sortBy } from 'lodash';
import GlobalMap from "components/Map";
import Highlight from 'components/Highlight'
import Summary from 'components/Summary'
import CountrySelector from 'components/CountrySelector'
// import TableStatistics from "components/TableStatistics";
import "./TrackerGlobal.scss"

function TrackerGlobal() {
    const { t } = useTranslation();
    const [mapData, setMapData] = useState({});
    const [countries, setCountries] = useState([]);

    const getCountries = () => {
        axios("https://disease.sh/v3/covid-19/countries")
            .then((res) => {
                setCountries(res.data);
            })
            .catch((err) => console.log("countries: ", err.response));
    };
    const getMapData = () => {
        import("@highcharts/map-collection/custom/world.geo.json").then((res) =>
            setMapData(res)
        );
    };
    const fetchData = async () => {
        try {
            await getCountries();
            await getMapData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="global-content">
                <GlobalMap mapData={mapData} countries={countries} />
            </div>
        </>
    );
}

export default TrackerGlobal;
