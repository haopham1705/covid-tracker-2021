import React, { useEffect, useState } from "react";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";

highchartsMap(Highchart);
const initOptions = {
    chart: {
        height: 300,
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
            [0.1, "#7BCD7E"],
            [0.2, "#8CB577"],
            [0.3, "#97A572"],
            [0.4, "#A2946E"],
            [0.5, "#AF8168"],
            [0.6, "#BA7363"],
            [0.7, "#C95C5D"],
            [0.8, "#D24E59"],
            [0.9, "#D24E5A"],
            [1, "#DD3F54"],
        ],
    },
    legend: {
        layout: "horizontal",
        align: "right",
        verticalAlign: "bottom",
    },
    series: [
        {
            mapData: {},
            name: "Global Cases",
            joinBy: ["hc-key", "key"],
        },
    ],
};

function GlobalMap({ mapData, countries }) {
    const [options, setOptions] = useState({});
    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            const data = mapData.features.map((feature, index) => {
                const country = countries.find(
                    (country) => country.countryInfo.iso2 === feature.id
                );
                return {
                    key: feature.properties["hc-key"],
                    value: country?.cases || index,
                };
            });
            setOptions({
                ...initOptions,
                series: [
                    {
                        ...initOptions.series[0],
                        mapData: mapData,
                        data: data,
                    },
                ],
            });
        }
    }, [mapData, countries]);
    return (
        <div className="analytics__map">
            <HighchartsReact
                highcharts={Highchart}
                options={options}
                constructorType="mapChart"
            />
        </div>
    );
}

export default GlobalMap;
